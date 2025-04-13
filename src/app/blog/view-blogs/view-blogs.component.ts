import { Component, inject, Input } from '@angular/core';
import { BlogsService } from '../../blogs.service';
import { PreviewBlogComponent } from '../preview-blog/preview-blog.component';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-view-blogs',
  imports: [PreviewBlogComponent, NgFor, AsyncPipe],
  templateUrl: './view-blogs.component.html',
})
export class ViewBlogsComponent {
  @Input() userId: string | null = '';
  @Input() isBookmarked: string = 'false';
  @Input() isFollowing: string = 'false';
  @Input() tag: string = '';

  constructor(private readonly blogService: BlogsService) {}

  blogs$ = inject(BlogsService).blogs$;

  ngOnInit() {
    if (this.userId) {
      this.blogService.getAllByUserId(this.userId);
    } else {
      this.blogService.getAllBlogs({
        isBookmarked: this.isBookmarked,
        isFollowing: this.isFollowing,
        tag: this.tag,
      });
    }
  }
}
