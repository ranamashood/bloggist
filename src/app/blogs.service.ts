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
}
