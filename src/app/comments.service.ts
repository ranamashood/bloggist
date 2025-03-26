import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  firstValueFrom,
  Observable,
  switchMap,
  take,
} from 'rxjs';
import { Comment } from './comment.model';
import { CommentResponse } from './response.models';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  currentUser$ = inject(UserService).currentUser$;

  constructor(private readonly http: HttpClient) {}

  private commentsSubject = new BehaviorSubject<CommentResponse[]>([]);
  public comments$ = this.commentsSubject.asObservable();

  create(comment: Partial<Comment>): Observable<CommentResponse> {
    return this.http.post<CommentResponse>('/api/comments', comment);
  }

  getAllByBlogId(blogId: string): Observable<CommentResponse[]> {
    return this.currentUser$.pipe(
      take(1),
      switchMap((user) =>
        this.http.get<CommentResponse[]>(
          `/api/comments/${blogId}${user?._id ? `?userId=${user?._id}` : ''}`,
        ),
      ),
    );
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
        } else if (comment?.replies?.length) {
          return { ...comment, replies: addReply(comment.replies) };
        }

        return comment;
      });
    };

    return this.commentsSubject.next(addReply(comments));
  }

  getAllByUserId(userId: string) {
    this.http
      .get<CommentResponse[]>(`/api/users/${userId}/comments`)
      .subscribe((comments) => this.commentsSubject.next(comments));
  }

  getCommentsByBlogId(blogId: string) {
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

  toggleLike(id: string) {
    return this.http.post<{ liked: boolean }>('/api/comments/likes', { id });
  }

  sort(type: 'top' | 'latest' | 'oldest') {
    let sortedComments: CommentResponse[] = [];

    this.comments$.subscribe(
      (comments) =>
        (sortedComments = comments.sort((a, b) => {
          if (type === 'top') {
            return b.totalLikes - a.totalLikes;
          } else if (type === 'latest') {
            return b.createdAt.localeCompare(a.createdAt);
          } else {
            return a.createdAt.localeCompare(b.createdAt);
          }
        })),
    );

    return this.commentsSubject.next(sortedComments);
  }
}
