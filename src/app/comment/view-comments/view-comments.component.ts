import { Component, Input } from '@angular/core';
import { CommentsService } from '../../comments.service';
import { Observable } from 'rxjs';
import { Comment } from '../../comment.model';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-view-comments',
  imports: [FormsModule, CommonModule, NgFor],
  templateUrl: './view-comments.component.html',
})
export class ViewCommentsComponent {
  constructor(private readonly commentService: CommentsService) {}

  @Input() blogId: string = '';
  comments$: Observable<Comment[]> = new Observable<Comment[]>();

  ngOnInit() {
    this.comments$ = this.commentService.getAllByBlogId(this.blogId);
  }
}
