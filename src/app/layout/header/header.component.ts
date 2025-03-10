import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  currentUser$ = inject(UserService).currentUser;

  constructor(private readonly userService: UserService) {}

  onLogout() {
    this.userService.logout();
  }
}
