import { Component, Input } from '@angular/core';
import { UserResponse } from '../../response.models';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-preview-avatar',
  imports: [NgStyle],
  templateUrl: './preview-avatar.component.html',
  styleUrl: './preview-avatar.component.css',
})
export class PreviewAvatarComponent {
  @Input() user: UserResponse = {} as UserResponse;
}
