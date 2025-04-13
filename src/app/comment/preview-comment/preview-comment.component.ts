import { Component, inject, Input } from '@angular/core';
import { ViewAvatarComponent } from '../../avatar/view-avatar/view-avatar.component';
import { CommentResponse } from '../../response.models';
import { DatePipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentsService } from '../../comments.service';
import { UserService } from '../../user.service';
import { NgIcon } from '@ng-icons/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AddCommentComponent } from '../add-comment/add-comment.component';

@Component({
  selector: 'app-preview-comment',
  imports: [
    ViewAvatarComponent,
    DatePipe,
    FormsModule,
    NgIf,
    NgFor,
    NgIcon,
    NgStyle,
    NgClass,
    NgbDropdownModule,
    AddCommentComponent,
  ],
  templateUrl: './preview-comment.component.html',
})
export class PreviewCommentComponent {
  @Input() comment: CommentResponse = {} as CommentResponse;
  @Input() blogId = '';
  @Input() indent = 0;
  reply = '';
  isReplying = false;
  currentUser$ = inject(UserService).currentUser$;
  isAuthor = false;
  isEditing = false;

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
        blogId: this.blogId,
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
