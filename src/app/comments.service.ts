import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { Comment } from './comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private readonly http: HttpClient) {}

  private commentsSubject = new BehaviorSubject<Comment[]>([]);
  public comments$ = this.commentsSubject.asObservable();

  create(comment: Partial<Comment>): Observable<Comment> {
    return this.http.post<Comment>('/api/comments', comment);
  }

  getAllByBlogId(blogId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`/api/comments/${blogId}`);
  }

  async addComment(newComment: Comment) {
    const currentComments = await firstValueFrom(this.comments$);
    this.commentsSubject.next([...currentComments, newComment]);
  }

  getComments(blogId: string) {
    this.getAllByBlogId(blogId).subscribe((comments) =>
      this.commentsSubject.next(comments),
    );
  }
}
