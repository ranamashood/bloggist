import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { UserService } from './user.service';
import { EMPTY } from 'rxjs';
import { tokenInterceptor } from './token.interceptor';

export function initAuth(userService: UserService) {
  return () => (userService.getToken() ? userService.getCurrentUser() : EMPTY);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor])),
    provideAppInitializer(() => {
      const userService = inject(UserService);
      return initAuth(userService)();
    }),
  ],
};
