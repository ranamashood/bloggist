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

  set(notification: Notification) {
    this.notificationSubject.next(notification);
  }

  delete() {
    this.notificationSubject.next(null);
  }
}
