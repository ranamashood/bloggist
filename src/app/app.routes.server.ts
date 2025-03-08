import { RenderMode, ServerRoute } from '@angular/ssr';
import { BlogsService } from './blogs.service';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export const serverRoutes: ServerRoute[] = [
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
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
