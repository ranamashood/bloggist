import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { Comment } from './comment.model';
import { CommentResponse } from './response.models';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private readonly http: HttpClient) {}

  private commentsSubject = new BehaviorSubject<CommentResponse[]>([]);
  public comments$ = this.commentsSubject.asObservable();

  create(comment: Partial<Comment>): Observable<CommentResponse> {
    return this.http.post<CommentResponse>('/api/comments', comment);
  }

  getAllByBlogId(blogId: string): Observable<CommentResponse[]> {
    return this.http.get<CommentResponse[]>(`/api/comments/${blogId}`);
  }

  async addComment(newComment: CommentResponse) {
    const comments = await firstValueFrom(this.comments$);

    if (!newComment.replyId) {
      return this.commentsSubject.next([...comments, newComment]);
    }

    const addReply = (comments: CommentResponse[]): CommentResponse[] => {
      return comments.map((comment) => {
        if (comment._id === newComment.replyId) {
          return {
            ...comment,
            replies: [...(comment.replies ?? []), newComment],
          };
        } else if (comment?.replies.length) {
          return { ...comment, replies: addReply(comment.replies) };
        }

        return comment;
      });
    };

    return this.commentsSubject.next(addReply(comments));
  }

  getComments(blogId: string) {
    this.getAllByBlogId(blogId).subscribe((comments) => {
      return this.commentsSubject.next(comments);
    });
  }

  delete(id: string): Observable<CommentResponse> {
    return this.http.delete<CommentResponse>(`/api/comments/${id}`);
  }

  async deleteComment(id: string) {
    const comments = await firstValueFrom(this.comments$);

    const deleteHelper = (comments: CommentResponse[]): CommentResponse[] =>
      comments.map((comment) => ({
        ...comment,
        replies: comment.replies ? deleteHelper(comment.replies) : [],
        ...(comment._id === id ? { comment: '', isDeleted: true } : {}),
      }));

    return this.commentsSubject.next(deleteHelper(comments));
  }
}
