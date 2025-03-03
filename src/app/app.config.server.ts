import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { UNIVERSAL_PROVIDERS } from '@ng-web-apis/universal';

const serverConfig: ApplicationConfig = {
  providers: [
    UNIVERSAL_PROVIDERS,
    provideServerRendering(),
    provideServerRouting(serverRoutes),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
