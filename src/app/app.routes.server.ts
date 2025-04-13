import { RenderMode, ServerRoute } from '@angular/ssr';
import { BlogsService } from './blogs.service';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserService } from './user.service';
import { TagsService } from './tags.service';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'user/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const userService = inject(UserService);
      const users = await firstValueFrom(userService.getAllIds());

      return users.map((user) => ({ id: user._id }));
    },
  },
  {
    path: 'blog/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const blogService = inject(BlogsService);
      const blogs = await firstValueFrom(blogService.getAllIds());

      return blogs.map((blog) => ({ id: blog._id }));
    },
  },
  {
    path: 'tag/:tagName',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const tagService = inject(TagsService);
      const tags = await firstValueFrom(tagService.getAllNames());

      return tags.map((tag) => ({ tagName: tag.name }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
