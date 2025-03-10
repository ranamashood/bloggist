import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogsService } from '../blogs.service';
import { CommonModule, NgFor } from '@angular/common';
import { Observable } from 'rxjs';
import { PreviewBlogComponent } from '../blog/preview-blog/preview-blog.component';
import { BlogsResponse } from '../response.models';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, NgFor, PreviewBlogComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private readonly blogService: BlogsService) {}

  blogs$: Observable<BlogsResponse[]> = new Observable<BlogsResponse[]>();

  ngOnInit(): void {
    this.blogs$ = this.blogService.getAll();
  }
}
