import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // {path: "blogs/"}
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
