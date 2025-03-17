import { inject, Injectable } from '@angular/core';
import { Observable, switchMap, take } from 'rxjs';
import { Blog } from './blog.model';
import { HttpClient } from '@angular/common/http';
import { BlogResponse, BlogsResponse } from './response.models';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  currentUser$ = inject(UserService).currentUser$;

  constructor(private readonly http: HttpClient) {}

  create(blog: Partial<Blog>): Observable<Blog> {
    return this.http.post<Blog>('/api/blogs', blog);
  }

  getById(id: string): Observable<BlogResponse> {
    return this.currentUser$.pipe(
      take(1),
      switchMap((user) =>
        this.http.get<BlogResponse>(
          `/api/blogs/${id}${user?._id ? `?userId=${user?._id}` : ''}`,
        ),
      ),
    );
  }

  getAll(): Observable<BlogsResponse[]> {
    return this.currentUser$.pipe(
      take(1),
      switchMap((user) =>
        this.http.get<BlogsResponse[]>(
          `/api/blogs${user?._id ? `?userId=${user?._id}` : ''}`,
        ),
      ),
    );
  }

  getAllIds(): Observable<{ _id: string }[]> {
    return this.http.get<{ _id: string }[]>('/api/blogs/ids');
  }

  delete(id: string): Observable<Blog> {
    return this.http.delete<Blog>(`/api/blogs/${id}`);
  }

  toggleLike(id: string) {
    return this.http.post<{ liked: boolean }>('/api/blogs/likes', { id });
  }
}
