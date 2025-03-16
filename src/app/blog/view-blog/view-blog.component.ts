import {
  Component,
  ElementRef,
  inject,
  Inject,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  combineLatest,
  firstValueFrom,
  map,
  Observable,
  of,
  withLatestFrom,
} from 'rxjs';
import { BlogsService } from '../../blogs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddCommentComponent } from '../../comment/add-comment/add-comment.component';
import { ViewCommentsComponent } from '../../comment/view-comments/view-comments.component';
import { BlogResponse } from '../../response.models';
import { TableOfContentComponent } from '../../table-of-content/table-of-content.component';
import { ViewAvatarComponent } from '../../avatar/view-avatar/view-avatar.component';
import { UserService } from '../../user.service';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-view-blog',
  imports: [
    CommonModule,
    AddCommentComponent,
    ViewCommentsComponent,
    TableOfContentComponent,
    ViewAvatarComponent,
    NgIcon,
  ],
  templateUrl: './view-blog.component.html',
})
export class ViewBlogComponent {
  @ViewChild('blogContent', { static: false }) blogContent!: ElementRef;
  blog$: Observable<BlogResponse> = new Observable();
  blogId = '';
  currentUser$ = inject(UserService).currentUser$;
  isAuthor = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly blogService: BlogsService,
    private readonly renderer: Renderer2,
    private readonly userService: UserService,
    private readonly router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.route.paramMap.subscribe((params) => {
      this.blogId = params.get('id')!;
    });
  }

  ngOnInit() {
    this.blog$ = this.blogService.getById(this.blogId);

    combineLatest([this.currentUser$, this.blog$]).subscribe(
      ([currentUser, blog]) => {
        this.isAuthor = currentUser?._id === blog.user._id;
      },
    );
  }

  ngAfterViewChecked() {
    if (isPlatformBrowser(this.platformId)) {
      this.assignIdsToHeadings();
    }
  }

  assignIdsToHeadings() {
    if (!this.blogContent?.nativeElement) {
      return;
    }

    const headings: NodeListOf<Element> =
      this.blogContent.nativeElement.querySelectorAll('h1, h2, h3, h4, h5, h6');

    headings.forEach((heading) => {
      const id = heading.textContent!.toLowerCase().replace(/\s+/g, '-');
      this.renderer.setAttribute(heading, 'id', id);
    });
  }

  onDeleteBlog() {
    this.blogService
      .delete(this.blogId)
      .subscribe({ next: () => this.router.navigate(['/']) });
  }

  onToggleLike() {
    this.blogService
      .toggleLike(this.blogId)
      .pipe(
        withLatestFrom(this.blog$),
        map(([{ liked }, blog]) => ({
          ...blog,
          isLiked: liked,
          totalLikes: liked ? blog.totalLikes + 1 : blog.totalLikes - 1,
        })),
      )
      .subscribe((updatedBlog) => (this.blog$ = of(updatedBlog)));
  }

  scroll(element: HTMLElement) {
    element.scrollIntoView();
  }
}
