import { Component } from '@angular/core';
import { ViewBlogsComponent } from '../blog/view-blogs/view-blogs.component';

@Component({
  selector: 'app-home',
  imports: [ViewBlogsComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
