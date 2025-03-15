import { Component, inject, Input } from '@angular/core';
import { ViewAvatarComponent } from '../../avatar/view-avatar/view-avatar.component';
import { BlogResponse, CommentResponse } from '../../response.models';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentsService } from '../../comments.service';
import { UserService } from '../../user.service';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-preview-comment',
  imports: [ViewAvatarComponent, DatePipe, FormsModule, NgIf, NgFor, NgIcon],
  templateUrl: './preview-comment.component.html',
})
export class PreviewCommentComponent {
  @Input() comment: CommentResponse = {} as CommentResponse;
  @Input() blog: BlogResponse = {} as BlogResponse;
  @Input() indent = 0;
  reply = '';
  isReplying = false;
  currentUser$ = inject(UserService).currentUser$;
  isAuthor = false;

  constructor(private readonly commentService: CommentsService) {}

  ngOnInit() {
    this.currentUser$.subscribe((currentUser) => {
      this.isAuthor = currentUser?._id === this.comment.user._id;
    });
  }

  onCancelReply() {
    this.reply = '';
    this.isReplying = false;
  }

  onAddReply() {
    this.commentService
      .create({
        comment: this.reply,
        blogId: this.blog._id,
        replyId: this.comment._id,
      })
      .subscribe({
        next: (insertedComment) => {
          this.onCancelReply();
          this.commentService.addComment(insertedComment);
        },
      });
  }

  onDeleteComment() {
    this.commentService.delete(this.comment._id).subscribe({
      next: () => this.commentService.deleteComment(this.comment._id),
    });
  }

  onToggleLike() {
    this.commentService.toggleLike(this.comment._id).subscribe(({ liked }) => {
      this.comment.isLiked = liked;
      liked ? this.comment.totalLikes++ : this.comment.totalLikes--;
    });
  }
}
