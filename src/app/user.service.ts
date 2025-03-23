import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  Observable,
  shareReplay,
  tap,
} from 'rxjs';
import { User } from './user.model';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  public isAuthenticated = this.currentUser$.pipe(
    map((user: User | null) => !!user),
  );

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  register(user: Partial<User>): Observable<User> {
    return this.http
      .post<User>('/api/user/register', user)
      .pipe(tap((user) => this.setAuth(user)));
  }

  login(user: Partial<User>): Observable<User> {
    return this.http
      .post<User>('/api/user/login', user)
      .pipe(tap((user) => this.setAuth(user)));
  }

  logout() {
    this.purgeAuth();
    this.router.navigate(['/']);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>('/api/user').pipe(
      tap({
        next: (user) => this.setAuth(user),
      }),
      shareReplay(1),
    );
  }

  setAuth(user: User) {
    if (isPlatformBrowser(this.platformId)) {
      window.localStorage['token'] = user.token;
      this.currentUserSubject.next(user);
    }
  }

  purgeAuth() {
    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.removeItem('token');
      this.currentUserSubject.next(null);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return window.localStorage.getItem('token');
    }
    return null;
  }

  toggleFollow(followingId: string) {
    return this.http.post<{ followed: boolean }>('/api/followers', {
      followingId,
    });
  }

  isFollowing(followingId: string) {
    return this.http.get<{ followed: boolean }>(
      `/api/followers/${followingId}`,
    );
  }
}
