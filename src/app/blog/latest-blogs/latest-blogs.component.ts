import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { LatestBlogsResponse, UserResponse } from '../../response.models';
import { AsyncPipe, NgIf, NgFor } from '@angular/common';
import { BlogsService } from '../../blogs.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-latest-blogs',
  imports: [NgIf, NgFor, AsyncPipe, RouterLink],
  templateUrl: './latest-blogs.component.html',
})
export class LatestBlogsComponent {
  @Input() user: UserResponse = {} as UserResponse;
  @Input() blogId = '';
  blogs$: Observable<LatestBlogsResponse[]> = new Observable<
    LatestBlogsResponse[]
  >();

  constructor(private readonly blogService: BlogsService) {}

  ngOnInit() {
    this.blogs$ = this.blogService.getLatestUserBlogs(
      this.user._id,
      this.blogId,
    );
  }
}
