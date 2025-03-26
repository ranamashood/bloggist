import { Component } from '@angular/core';
import { ViewCommentsComponent } from '../../comment/view-comments/view-comments.component';
import { ActivatedRoute } from '@angular/router';
import { ViewBlogsComponent } from '../../blog/view-blogs/view-blogs.component';
import {
  NgbNav,
  NgbNavContent,
  NgbNavItem,
  NgbNavLinkButton,
  NgbNavOutlet,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-user',
  imports: [
    ViewBlogsComponent,
    ViewCommentsComponent,
    NgbNav,
    NgbNavOutlet,
    NgbNavItem,
    NgbNavLinkButton,
    NgbNavContent,
  ],
  templateUrl: './view-user.component.html',
})
export class ViewUserComponent {
  userId = '';

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id')!;
    });
  }
}
