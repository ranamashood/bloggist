import {
  Component,
  ElementRef,
  inject,
  Inject,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule, isPlatformBrowser, NgStyle } from '@angular/common';
import {
  combineLatest,
  firstValueFrom,
  map,
  Observable,
  of,
  shareReplay,
  withLatestFrom,
} from 'rxjs';
import { BlogsService } from '../../blogs.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AddCommentComponent } from '../../comment/add-comment/add-comment.component';
import { ViewCommentsComponent } from '../../comment/view-comments/view-comments.component';
import { BlogResponse } from '../../response.models';
import { TableOfContentComponent } from '../../table-of-content/table-of-content.component';
import { ViewAvatarComponent } from '../../avatar/view-avatar/view-avatar.component';
import { UserService } from '../../user.service';
import { NgIcon } from '@ng-icons/core';
import { LatestBlogsComponent } from '../latest-blogs/latest-blogs.component';
import { NotificationService } from '../../notification.service';
import { PreviewUserComponent } from '../../user/preview-user/preview-user.component';
import { SortButtonComponent } from '../../sort-button/sort-button.component';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-blog',
  imports: [
    CommonModule,
    AddCommentComponent,
    ViewCommentsComponent,
    TableOfContentComponent,
    ViewAvatarComponent,
    NgIcon,
    NgStyle,
    LatestBlogsComponent,
    PreviewUserComponent,
    SortButtonComponent,
    NgbTooltip,
    RouterLink,
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
    private readonly notificationService: NotificationService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.route.paramMap.subscribe((params) => {
        this.blogId = params.get('id')!;
        this.blog$ = this.blogService.getById(this.blogId).pipe(shareReplay(1));
      });
    }

    combineLatest([this.currentUser$, this.blog$]).subscribe(
      ([currentUser, blog]) => {
        this.isAuthor = currentUser?._id === blog.user._id;
      },
    );
  }

  ngAfterViewChecked() {
    if (isPlatformBrowser(this.platformId)) {
      this.blogService.setBlogDivider(
        this.blogContent?.nativeElement.scrollHeight +
          this.blogContent?.nativeElement.offsetTop,
      );

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

  onToggleBookmark() {
    this.blogService
      .toggleBookmark(this.blogId)
      .pipe(
        withLatestFrom(this.blog$),
        map(([{ bookmarked }, blog]) => ({
          ...blog,
          isBookmarked: bookmarked,
          totalBookmarks: bookmarked
            ? blog.totalBookmarks + 1
            : blog.totalBookmarks - 1,
        })),
      )
      .subscribe((updatedBlog) => (this.blog$ = of(updatedBlog)));
  }

  shareBlog() {
    this.notificationService.set({
      header: 'Link Copied!',
      message: 'Share the link with anyone by pasting it',
    });
  }
}
