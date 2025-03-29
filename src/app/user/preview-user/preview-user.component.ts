import { Component, Input } from '@angular/core';
import { UserResponse } from '../../response.models';
import { FollowButtonUserComponent } from '../follow-button-user/follow-button-user.component';
import { DatePipe } from '@angular/common';
import { PreviewAvatarComponent } from '../../avatar/preview-avatar/preview-avatar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-preview-user',
  imports: [
    PreviewAvatarComponent,
    FollowButtonUserComponent,
    DatePipe,
    RouterLink,
  ],
  templateUrl: './preview-user.component.html',
  styleUrl: './preview-user.component.css',
})
export class PreviewUserComponent {
  @Input() user: UserResponse = {} as UserResponse;
}
