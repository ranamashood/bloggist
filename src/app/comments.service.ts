import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from './comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private readonly http: HttpClient) {}

  create(comment: Partial<Comment>): Observable<Comment> {
    return this.http.post<Comment>('/api/comments', comment);
  }

  getAllByBlogId(blogId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`/api/comments/${blogId}`);
  }
}
