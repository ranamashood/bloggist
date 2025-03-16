import { Component, Input } from '@angular/core';
import { UserResponse } from '../../response.models';
import { NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-preview-avatar',
  imports: [NgStyle, NgIf],
  templateUrl: './preview-avatar.component.html',
  styleUrl: './preview-avatar.component.css',
})
export class PreviewAvatarComponent {
  @Input() contentLoaded = true;
  @Input() user: UserResponse = {} as UserResponse;
}
