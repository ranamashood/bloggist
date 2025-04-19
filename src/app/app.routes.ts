import { Routes } from '@angular/router';
import { AddBlogComponent } from './blog/add-blog/add-blog.component';
import { HomeComponent } from './home/home.component';
import { ViewBlogComponent } from './blog/view-blog/view-blog.component';
import { AuthComponent } from './auth/auth.component';
import { ViewUserComponent } from './user/view-user/view-user.component';
import { UserSettingsComponent } from './user/user-settings/user-settings.component';
import { ViewTagComponent } from './tag/view-tag/view-tag.component';
import { BlogAnalyticsComponent } from './blog/blog-analytics/blog-analytics.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: AuthComponent },
  { path: 'login', component: AuthComponent },
  { path: 'user/:id', component: ViewUserComponent },
  { path: 'user/:id/settings', component: UserSettingsComponent },
  { path: 'blog/add', component: AddBlogComponent },
  { path: 'blog/:id', component: ViewBlogComponent },
  { path: 'blog/:id/edit', component: AddBlogComponent },
  { path: 'blog/:id/analytics', component: BlogAnalyticsComponent },
  { path: 'tag/:tagName', component: ViewTagComponent },
];
