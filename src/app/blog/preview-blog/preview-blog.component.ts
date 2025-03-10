import { Component, Input } from '@angular/core';
import { BlogsResponse } from '../../response.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preview-blog',
  imports: [CommonModule],
  templateUrl: './preview-blog.component.html',
})
export class PreviewBlogComponent {
  @Input() blog: BlogsResponse = {} as BlogsResponse;
}
