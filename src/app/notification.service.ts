import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notification } from './notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<Notification | null>(null);
  public notification$ = this.notificationSubject.asObservable();

  constructor() {}

  set(notification: Notification, isError: boolean = false) {
    notification.className = isError ? 'bg-danger-subtle' : 'bg-primary-subtle';
    this.notificationSubject.next(notification);

    if (notification.type !== 'authentication') {
      setTimeout(() => this.delete(), 5000);
    }
  }

  delete() {
    this.notificationSubject.next(null);
  }
}
