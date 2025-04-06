import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, take } from 'rxjs';
import { Blog } from './blog.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  BlogResponse,
  BlogsResponse,
  LatestBlogsResponse,
} from './response.models';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  private blogsSubject = new BehaviorSubject<BlogsResponse[]>([]);
  public blogs$ = this.blogsSubject.asObservable();

  private blogDividerSubject = new BehaviorSubject<number>(0);
  public blogDivider$ = this.blogDividerSubject.asObservable();

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

  getAll(params: Record<string, string>): Observable<BlogsResponse[]> {
    return this.currentUser$.pipe(
      take(1),
      switchMap((user) => {
        const httpParams = new HttpParams({
          fromObject: {
            ...params,
            ...(user?._id ? { userId: user?._id } : {}),
          },
        });

        return this.http.get<BlogsResponse[]>('/api/blogs', {
          params: httpParams,
        });
      }),
    );
  }

  getAllIds(): Observable<{ _id: string }[]> {
    return this.http.get<{ _id: string }[]>('/api/blogs/ids');
  }

  getLatestUserBlogs(
    userId: string,
    openedBlogId: string = '',
  ): Observable<LatestBlogsResponse[]> {
    return this.http.get<LatestBlogsResponse[]>(
      `/api/users/${userId}/blogs${openedBlogId ? `?openedBlogId=${openedBlogId}` : ''}`,
    );
  }

  getAllBlogs(params: Record<string, string> = {}) {
    this.getAll(params).subscribe((blogs) => {
      this.blogsSubject.next(blogs);
    });
  }

  getAllByUserId(userId: string) {
    this.http
      .get<BlogsResponse[]>(`/api/users/${userId}/blogs`)
      .subscribe((blogs) => this.blogsSubject.next(blogs));
  }

  getByTitle(title: string) {
    return this.http.get<BlogsResponse[]>(`/api/blogs?title=${title}&limit=5`);
  }

  delete(id: string): Observable<Blog> {
    return this.http.delete<Blog>(`/api/blogs/${id}`);
  }

  toggleLike(id: string) {
    return this.http.post<{ liked: boolean }>('/api/blogs/likes', { id });
  }

  toggleBookmark(id: string) {
    return this.http.post<{ bookmarked: boolean }>('/api/blogs/bookmarks', {
      id,
    });
  }

  sort(type: string) {
    let sortedBlogs: BlogsResponse[] = [];

    this.blogs$.subscribe(
      (blogs) =>
        (sortedBlogs = blogs.sort((a, b) => {
          if (type === 'top') {
            return b.totalLikes - a.totalLikes;
          } else if (type === 'new') {
            return b.createdAt.localeCompare(a.createdAt);
          } else {
            return a.createdAt.localeCompare(b.createdAt);
          }
        })),
    );

    return this.blogsSubject.next(sortedBlogs);
  }

  setBlogDivider(value: number) {
    this.blogDividerSubject.next(value);
  }
}
