import { Component } from '@angular/core';
import { ViewBlogsComponent } from '../blog/view-blogs/view-blogs.component';
import {
  NgbNav,
  NgbNavContent,
  NgbNavItem,
  NgbNavLinkButton,
  NgbNavOutlet,
} from '@ng-bootstrap/ng-bootstrap';
import { NgIcon } from '@ng-icons/core';
import { ViewTagsComponent } from '../tag/view-tags/view-tags.component';

@Component({
  selector: 'app-home',
  imports: [
    ViewBlogsComponent,
    NgbNav,
    NgbNavOutlet,
    NgbNavItem,
    NgbNavLinkButton,
    NgbNavContent,
    NgIcon,
    ViewTagsComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  currentHoveredButton = 0;
  currentFocusedButton = 0;
}
