import { Component, Input } from '@angular/core';
import { PreviewAvatarComponent } from '../preview-avatar/preview-avatar.component';
import { UserResponse } from '../../response.models';
import { NgIf } from '@angular/common';
import { PreviewUserComponent } from '../../user/preview-user/preview-user.component';

@Component({
  selector: 'app-view-avatar',
  imports: [PreviewAvatarComponent, NgIf, PreviewUserComponent],
  templateUrl: './view-avatar.component.html',
  styleUrl: './view-avatar.component.css',
})
export class ViewAvatarComponent {
  @Input() contentLoaded = true;
  @Input() user: UserResponse = {} as UserResponse;
  @Input() date: string | null = '';
  @Input() blogReadingTime: number = 0;
  showUserPopup = false;
}
