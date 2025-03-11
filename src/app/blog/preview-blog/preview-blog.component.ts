import { Component, Input } from '@angular/core';
import { BlogsResponse } from '../../response.models';
import { CommonModule } from '@angular/common';
import { ViewAvatarComponent } from '../../avatar/view-avatar/view-avatar.component';

@Component({
  selector: 'app-preview-blog',
  imports: [CommonModule, ViewAvatarComponent],
  templateUrl: './preview-blog.component.html',
})
export class PreviewBlogComponent {
  @Input() blog: BlogsResponse = {} as BlogsResponse;
}
