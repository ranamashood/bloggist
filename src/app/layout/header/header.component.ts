import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../user.service';
import { AsyncPipe } from '@angular/common';
import { PreviewAvatarComponent } from '../../avatar/preview-avatar/preview-avatar.component';
import { ToggleThemeComponent } from '../../toggle-theme/toggle-theme.component';
import { NgIcon } from '@ng-icons/core';
import { SearchBarComponent } from '../../search-bar/search-bar.component';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    AsyncPipe,
    PreviewAvatarComponent,
    ToggleThemeComponent,
    NgIcon,
    SearchBarComponent,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  currentUser$ = inject(UserService).currentUser$;

  constructor(private readonly userService: UserService) {}

  onLogout() {
    this.userService.logout();
  }
}
