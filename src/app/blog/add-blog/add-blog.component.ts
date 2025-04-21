import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BlogsService } from '../../blogs.service';
import { EditorComponent } from '../../editor/editor.component';
import { EditorService } from '../../editor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TagsService } from '../../tags.service';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  merge,
  Observable,
  OperatorFunction,
  Subject,
} from 'rxjs';
import { NgClass, NgFor } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { NotificationService } from '../../notification.service';

@Component({
  selector: 'app-add-blog',
  imports: [FormsModule, EditorComponent, NgbTypeahead, NgFor, NgIcon, NgClass],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css',
})
export class AddBlogComponent {
  title = '';
  tag: string = '';
  tags: string[] = [];
  selectedTags: string[] = [];
  hoveredTag: string = '';
  blogId: string | null = '';
  desc = '';

  @ViewChild('instance', { static: true }) instance!: NgbTypeahead;

  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(
    private readonly blogService: BlogsService,
    private readonly tagService: TagsService,
    private readonly editorService: EditorService,
    private readonly notificationService: NotificationService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.blogId = params.get('id');

      if (!this.blogId) {
        return;
      }

      this.blogService.getById(this.blogId, true).subscribe((blog) => {
        this.title = blog.title;
        this.desc = blog.desc;
        this.selectedTags = blog.tags;
      });
    });

    this.tagService.getAll().subscribe((tags) => {
      this.tags = tags.map((tag) => tag.name);
      this.tags = this.tags.filter((tag) => !this.selectedTags.includes(tag));
    });
  }

  onAddBlog() {
    this.blogService
      .create({
        title: this.title,
        desc: this.editorService.getContent(),
        tags: this.selectedTags,
      })
      .subscribe({
        next: () => {
          this.title = '';
          this.editorService.setContent('');
          this.router.navigate(['/']);
        },
      });
  }

  onEditBlog() {
    this.blogService
      .update(this.blogId!, {
        title: this.title,
        desc: this.editorService.getContent(),
        tags: this.selectedTags,
      })
      .subscribe({
        next: () => {
          this.title = '';
          this.editorService.setContent('');
          this.router.navigate(['/blog', this.blogId]);
        },
      });
  }

  onAddTag() {
    if (this.tag) {
      if (this.selectedTags.length === 5) {
        this.notificationService.set({
          header: 'Tags Limit',
          message: 'Tags can not be more than 5',
        });

        return;
      }

      if (!this.selectedTags.includes(this.tag)) {
        this.selectedTags.push(this.tag);
        this.tags = this.tags.filter((tag) => tag !== this.tag);
        this.tag = '';
      }
    }
  }

  onDeleteTag = (tag: string) => {
    this.selectedTags = this.selectedTags.filter(
      (selectedTag) => selectedTag !== tag,
    );
    this.tags.push(tag);
  };

  search: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>,
  ) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
    );
    const clicksWithClosedPopup$ = this.click$.pipe(
      filter(() => !this.instance.isPopupOpen()),
    );
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term: string) =>
        (term === ''
          ? this.tags
          : this.tags.filter((tag) =>
              tag.toLowerCase().includes(term.toLowerCase()),
            )
        ).slice(0, 10),
      ),
    );
  };
}
