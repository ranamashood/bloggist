import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [FormsModule, NgIf],
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
  ) {}

  authType = '';
  name = '';
  email = '';
  password = '';

  ngOnInit() {
    this.authType = this.router.url.split('/').pop()!;
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

    observable.subscribe({ next: () => this.router.navigate(['/']) });
  }
}
