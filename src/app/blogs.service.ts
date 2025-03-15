import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from './blog.model';
import { HttpClient } from '@angular/common/http';
import { BlogResponse, BlogsResponse } from './response.models';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  constructor(private readonly http: HttpClient) {}

  create(blog: Partial<Blog>): Observable<Blog> {
    return this.http.post<Blog>('/api/blogs', blog);
  }

  getById(id: string): Observable<BlogResponse> {
    return this.http.get<BlogResponse>(`/api/blogs/${id}`);
  }

  getAll(): Observable<BlogsResponse[]> {
    return this.http.get<BlogsResponse[]>('/api/blogs');
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
