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
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
