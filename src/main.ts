import {
  ErrorHandler,
  enableProdMode,
  importProvidersFrom,
} from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from './environments/environment';

import { AppComponent } from './app/app.component';
import { CustomErrorHandlerService } from './app/custom-error-handler.service';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GlobalHttpErrorHamdlerInterceptor } from './app/global-http-error-hamdler.interceptor';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserAnimationsModule,
      HttpClientModule,
      MatSnackBarModule
    ),
    { provide: ErrorHandler, useClass: CustomErrorHandlerService },
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpErrorHamdlerInterceptor, multi: true }
  ],
}).catch((err) => console.error(err));
