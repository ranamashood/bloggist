import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { BlogsService } from '../../blogs.service';
import { ActivatedRoute } from '@angular/router';
import { AddCommentComponent } from '../../comment/add-comment/add-comment.component';
import { ViewCommentsComponent } from '../../comment/view-comments/view-comments.component';
import { BlogResponse } from '../../response.models';

@Component({
  selector: 'app-view-blog',
  imports: [CommonModule, AddCommentComponent, ViewCommentsComponent],
  templateUrl: './view-blog.component.html',
})
export class ViewBlogComponent {
  blog$: Observable<BlogResponse> = new Observable();
  blogId = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly blogService: BlogsService,
  ) {
    this.route.paramMap.subscribe((params) => {
      this.blogId = params.get('id')!;
      this.blog$ = this.blogService.getById(this.blogId);
    });
  }
}
