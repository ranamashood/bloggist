import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentsService } from '../../comments.service';

@Component({
  selector: 'app-add-comment',
  imports: [FormsModule],
  templateUrl: './add-comment.component.html',
})
export class AddCommentComponent {
  constructor(private readonly commentService: CommentsService) {}

  @Input() blogId: string = '';
  @Input() comment = '';
  @Input() commentId = '';
  @Input() isEditing = false;
  @Output() isEditingChange = new EventEmitter<boolean>();

  onCancelComment() {
    this.comment = '';
    this.isEditing = false;
    this.isEditingChange.emit(this.isEditing);
  }

  onAddComment() {
    this.commentService
      .create({
        comment: this.comment,
        blogId: this.blogId,
      })
      .subscribe({
        next: (insertedComment) => {
          this.comment = '';
          this.commentService.addComment(insertedComment);
        },
      });
  }

  onUpdateComment() {
    this.isEditing = false;
    this.isEditingChange.emit(this.isEditing);

    this.commentService
      .update({
        id: this.commentId,
        comment: this.comment,
      })
      .subscribe({
        next: (insertedComment) => {
          this.commentService.updateComment(this.commentId, this.comment);
          this.comment = '';
        },
      });
  }
}
