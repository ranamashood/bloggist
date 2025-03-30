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
import { SortButtonComponent } from '../../sort-button/sort-button.component';
import { PreviewUserComponent } from '../preview-user/preview-user.component';
import { Observable } from 'rxjs';
import { UserResponse } from '../../response.models';
import { UserService } from '../../user.service';
import { AsyncPipe, NgIf } from '@angular/common';

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
    SortButtonComponent,
    PreviewUserComponent,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './view-user.component.html',
})
export class ViewUserComponent {
  userId = '';
  user$: Observable<UserResponse> = new Observable<UserResponse>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UserService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id')!;
      this.user$ = this.userService.getById(this.userId);
    });
  }
}
