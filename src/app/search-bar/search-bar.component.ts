import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Observable, of, switchMap } from 'rxjs';
import { BlogsResponse } from '../response.models';
import { BlogsService } from '../blogs.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  imports: [
    FormsModule,
    NgFor,
    AsyncPipe,
    NgIf,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  blogs$: Observable<BlogsResponse[]> = new Observable<BlogsResponse[]>();
  searchControl = new FormControl('');
  isInputFocused = false;
  isLinkHovered = false;

  constructor(private readonly blogService: BlogsService) {
    this.blogs$ = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      switchMap((value) =>
        value ? this.blogService.getByTitle(value) : of([]),
      ),
    );
  }
}
