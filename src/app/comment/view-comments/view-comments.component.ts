import { Component, inject, Input } from '@angular/core';
import { CommentsService } from '../../comments.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { PreviewCommentComponent } from '../preview-comment/preview-comment.component';

@Component({
  selector: 'app-view-comments',
  imports: [FormsModule, CommonModule, NgFor, PreviewCommentComponent],
  templateUrl: './view-comments.component.html',
})
export class ViewCommentsComponent {
  constructor(private readonly commentService: CommentsService) {}

  @Input() userId: string | null = '';
  @Input() blogId: string | null = '';
  comments$ = inject(CommentsService).comments$;

  ngOnInit() {
    if (this.userId) {
      this.commentService.getAllByUserId(this.userId);
    } else if (this.blogId) {
      this.commentService.getCommentsByBlogId(this.blogId);
    }
  }
}
