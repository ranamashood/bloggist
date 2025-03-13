import { Component, Input } from '@angular/core';
import { ViewAvatarComponent } from '../../avatar/view-avatar/view-avatar.component';
import { BlogResponse, CommentResponse } from '../../response.models';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentsService } from '../../comments.service';

@Component({
  selector: 'app-preview-comment',
  imports: [ViewAvatarComponent, DatePipe, FormsModule, NgIf, NgFor],
  templateUrl: './preview-comment.component.html',
})
export class PreviewCommentComponent {
  @Input() comment: CommentResponse = {} as CommentResponse;
  @Input() blog: BlogResponse = {} as BlogResponse;
  @Input() indent = 0;
  reply = '';
  isReplying = false;

  constructor(private readonly commentService: CommentsService) {}

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
}
