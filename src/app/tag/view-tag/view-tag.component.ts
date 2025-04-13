import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewBlogsComponent } from '../../blog/view-blogs/view-blogs.component';

@Component({
  selector: 'app-view-tag',
  imports: [ViewBlogsComponent],
  templateUrl: './view-tag.component.html',
})
export class ViewTagComponent {
  tag = '';

  constructor(private readonly route: ActivatedRoute) {
    this.route.paramMap.subscribe(
      (params) => (this.tag = params.get('tagName')!),
    );
  }
}
