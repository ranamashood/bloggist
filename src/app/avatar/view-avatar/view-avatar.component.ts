import { Component, Input } from '@angular/core';
import { PreviewAvatarComponent } from '../preview-avatar/preview-avatar.component';

@Component({
  selector: 'app-view-avatar',
  imports: [PreviewAvatarComponent],
  templateUrl: './view-avatar.component.html',
  styleUrl: './view-avatar.component.css',
})
export class ViewAvatarComponent {
  @Input() initials = '';
  @Input() name = '';
  @Input() date: string | null = '';
}
