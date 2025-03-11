import { Component, Input } from '@angular/core';
import { Comment } from '../../comment.model';
import { ViewAvatarComponent } from '../../avatar/view-avatar/view-avatar.component';
import { BlogResponse } from '../../response.models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-preview-comment',
  imports: [ViewAvatarComponent, DatePipe],
  templateUrl: './preview-comment.component.html',
})
export class PreviewCommentComponent {
  @Input() comment: Comment = {} as Comment;
  @Input() blog: BlogResponse = {} as BlogResponse;
}
