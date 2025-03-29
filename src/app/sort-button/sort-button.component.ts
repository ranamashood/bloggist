import { Component, Input } from '@angular/core';
import { CommentsService } from '../comments.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'app-sort-button',
  imports: [NgbDropdownModule],
  templateUrl: './sort-button.component.html',
})
export class SortButtonComponent {
  @Input() item: 'blog' | 'comment' = 'blog';
  type = 'new';

  constructor(
    private readonly blogService: BlogsService,
    private readonly commentService: CommentsService,
  ) {}

  sort(type: string) {
    this.type = type;

    if (this.item === 'blog') {
      this.blogService.sort(type);
    } else {
      this.commentService.sort(type);
    }
  }
}
