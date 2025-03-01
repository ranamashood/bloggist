import { Component } from '@angular/core';
import { Blog } from '../../blog.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { BlogsService } from '../../blogs.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-blog',
  imports: [CommonModule],
  templateUrl: './view-blog.component.html',
})
export class ViewBlogComponent {
  blog$: Observable<Blog> = new Observable();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly blogService: BlogsService,
  ) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id')!;
      this.blog$ = this.blogService.getById(id);
    });
  }
}
