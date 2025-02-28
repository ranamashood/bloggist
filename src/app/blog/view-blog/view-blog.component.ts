import { Component } from '@angular/core';
import { Blog } from '../../blog.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-blog',
  imports: [CommonModule],
  templateUrl: './view-blog.component.html',
})
export class ViewBlogComponent {
  blog: Blog;

  constructor() {
    this.blog = history.state;
  }
}
