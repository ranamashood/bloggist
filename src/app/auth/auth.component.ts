import { Component, Input } from '@angular/core';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-auth',
  imports: [FormsModule, NgIf, NgClass, RouterLink],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
  ) {}

  @Input() popup = false;
  authType = '';
  name = '';
  email = '';
  password = '';

  ngOnInit() {
    this.authType = this.popup ? 'login' : this.router.url.split('/').pop()!;
  }

  onSubmit() {
    const observable =
      this.authType === 'register'
        ? this.userService.register({
            name: this.name,
            email: this.email,
            password: this.password,
          })
        : this.userService.login({
            email: this.email,
            password: this.password,
          });

    observable.subscribe({
      next: () => {
        this.router.navigate(['/']);
        this.notificationService.delete();
      },
    });
  }

  closePopup() {
    this.notificationService.delete();
  }
}
