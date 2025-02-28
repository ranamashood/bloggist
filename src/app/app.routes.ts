import { Routes } from '@angular/router';
import { AddBlogComponent } from './blog/add-blog/add-blog.component';
import { HomeComponent } from './home/home.component';
import { ViewBlogComponent } from './blog/view-blog/view-blog.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blogs/add', component: AddBlogComponent },
  { path: 'blogs/:id', component: ViewBlogComponent },
];
