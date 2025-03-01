import { Component, Input } from '@angular/core';
import { Blog } from '../../blog.model';

@Component({
  selector: 'app-preview-blog',
  imports: [],
  templateUrl: './preview-blog.component.html',
})
export class PreviewBlogComponent {
  @Input() blog: Blog = {} as Blog;
}
