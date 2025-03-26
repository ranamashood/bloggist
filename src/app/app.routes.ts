import { Routes } from '@angular/router';
import { AddBlogComponent } from './blog/add-blog/add-blog.component';
import { HomeComponent } from './home/home.component';
import { ViewBlogComponent } from './blog/view-blog/view-blog.component';
import { AuthComponent } from './auth/auth.component';
import { ViewUserComponent } from './user/view-user/view-user.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: AuthComponent },
  { path: 'login', component: AuthComponent },
  { path: 'user/:id', component: ViewUserComponent },
  { path: 'blog/add', component: AddBlogComponent },
  { path: 'blog/:id', component: ViewBlogComponent },
];
