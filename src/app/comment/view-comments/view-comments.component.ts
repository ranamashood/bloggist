import { Component, inject, Input } from '@angular/core';
import { CommentsService } from '../../comments.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { PreviewCommentComponent } from '../preview-comment/preview-comment.component';
import { BlogResponse } from '../../response.models';

@Component({
  selector: 'app-view-comments',
  imports: [FormsModule, CommonModule, NgFor, PreviewCommentComponent],
  templateUrl: './view-comments.component.html',
})
export class ViewCommentsComponent {
  constructor(private readonly commentService: CommentsService) {}

  @Input() blogId: string = '';
  @Input() blog: BlogResponse = {} as BlogResponse;
  comments$ = inject(CommentsService).comments$;

  ngOnInit() {
    this.commentService.getComments(this.blogId);
  }
}
