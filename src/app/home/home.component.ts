import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogsService } from '../blogs.service';
import { Blog } from '../blog.model';
import { CommonModule, NgFor } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, NgFor],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private readonly blogService: BlogsService) {}

  blogs$: Observable<Blog[]> = new Observable<Blog[]>();

  ngOnInit(): void {
    this.blogs$ = this.blogService.getAll();
  }
}
