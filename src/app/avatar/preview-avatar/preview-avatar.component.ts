import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-preview-avatar',
  imports: [],
  templateUrl: './preview-avatar.component.html',
  styleUrl: './preview-avatar.component.css',
})
export class PreviewAvatarComponent {
  @Input() initials = '';
}
