import { Component, Input } from '@angular/core';
import { Tag } from '../../tag.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-preview-tag',
  imports: [RouterLink],
  templateUrl: './preview-tag.component.html',
})
export class PreviewTagComponent {
  @Input() tag: Tag = {} as Tag;

  constructor() {}
}
