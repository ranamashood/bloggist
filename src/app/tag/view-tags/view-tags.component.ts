import { Component } from '@angular/core';
import { TagsService } from '../../tags.service';
import { PreviewTagComponent } from '../preview-tag/preview-tag.component';
import { AsyncPipe, NgFor } from '@angular/common';
import { Observable } from 'rxjs';
import { Tag } from '../../tag.model';

@Component({
  selector: 'app-view-tags',
  imports: [PreviewTagComponent, NgFor, AsyncPipe],
  templateUrl: './view-tags.component.html',
})
export class ViewTagsComponent {
  tags$ = new Observable<Tag[]>();

  constructor(private readonly tagService: TagsService) {}

  ngOnInit() {
    this.tags$ = this.tagService.getAll();
  }
}
