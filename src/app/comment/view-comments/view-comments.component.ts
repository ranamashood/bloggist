import { Component, Input } from '@angular/core';
import { CommentsService } from '../../comments.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { PreviewCommentComponent } from '../preview-comment/preview-comment.component';
import { BlogResponse, CommentResponse } from '../../response.models';

@Component({
  selector: 'app-view-comments',
  imports: [FormsModule, CommonModule, NgFor, PreviewCommentComponent],
  templateUrl: './view-comments.component.html',
})
export class ViewCommentsComponent {
  constructor(private readonly commentService: CommentsService) {}

  @Input() blogId: string = '';
  @Input() blog: BlogResponse = {} as BlogResponse;
  comments$: Observable<CommentResponse[]> = new Observable<
    CommentResponse[]
  >();

  ngOnInit() {
    this.commentService.getComments(this.blogId);
    this.comments$ = this.commentService.comments$;
  }
}
