// src/main.ts

import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  providers: [
    // Use only the providers defined in appConfig (router, zone, etc.)
    ...appConfig.providers
  ]
})
  .catch(err => console.error(err));
