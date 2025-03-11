import { Component, Input } from '@angular/core';
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
  comment = '';
  currentUrl = '';

  onCancelComment() {
    this.comment = '';
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
}
