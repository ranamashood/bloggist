import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { Notification } from './notification.model';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError(({ error }) => {
      const notification: Notification = {
        type: error?.type,
        header: error.header,
        message: error.message,
      };

      notificationService.set(notification);

      return throwError(() => error);
    }),
  );
};
