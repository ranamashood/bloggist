import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from './blog.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  constructor(private readonly http: HttpClient) {}

  create(blog: Partial<Blog>): Observable<Blog> {
    return this.http.post<Blog>('/api/blogs', blog);
  }

  getById(id: string): Observable<Blog> {
    return this.http.get<Blog>(`/api/blogs/${id}`);
  }

  getAll(): Observable<Blog[]> {
    return this.http.get<Blog[]>('/api/blogs');
  }

  getAllIds(): Observable<{ _id: string }[]> {
    return this.http.get<{ _id: string }[]>('/api/blogs/ids');
  }
}
