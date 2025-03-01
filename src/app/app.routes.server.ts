import { RenderMode, ServerRoute } from '@angular/ssr';
// import { BlogsService } from './blogs.service';
// import { inject } from '@angular/core';
// import { firstValueFrom } from 'rxjs';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'blogs/:id',
    renderMode: RenderMode.Client,
    // getPrerenderParams: async () => {
    //   const blogService = inject(BlogsService);
    //   const blogIds = await firstValueFrom(blogService.getAllIds());
    //
    //   console.log('blogIds', blogIds);
    //   return blogIds.map((_id) => ({ id: String(_id) }));
    // },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
