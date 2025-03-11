import { Component, Input } from '@angular/core';
import { PreviewAvatarComponent } from '../preview-avatar/preview-avatar.component';
import { UserResponse } from '../../response.models';

@Component({
  selector: 'app-view-avatar',
  imports: [PreviewAvatarComponent],
  templateUrl: './view-avatar.component.html',
  styleUrl: './view-avatar.component.css',
})
export class ViewAvatarComponent {
  @Input() user: UserResponse = {} as UserResponse;
  @Input() date: string | null = '';
}
