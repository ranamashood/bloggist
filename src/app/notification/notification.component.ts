import { Component, inject } from '@angular/core';
import { NotificationService } from '../notification.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthComponent } from '../auth/auth.component';

@Component({
  selector: 'app-notification',
  imports: [AsyncPipe, NgIf, NgbToastModule, AuthComponent],
  templateUrl: './notification.component.html',
})
export class NotificationComponent {
  notification$ = inject(NotificationService).notification$;
}
