import {
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { BlogsService } from '../../blogs.service';
import { ActivatedRoute } from '@angular/router';
import { AddCommentComponent } from '../../comment/add-comment/add-comment.component';
import { ViewCommentsComponent } from '../../comment/view-comments/view-comments.component';
import { BlogResponse } from '../../response.models';
import { TableOfContentComponent } from '../../table-of-content/table-of-content.component';

@Component({
  selector: 'app-view-blog',
  imports: [
    CommonModule,
    AddCommentComponent,
    ViewCommentsComponent,
    TableOfContentComponent,
  ],
  templateUrl: './view-blog.component.html',
})
export class ViewBlogComponent {
  @ViewChild('blogContent', { static: false }) blogContent!: ElementRef;
  blog$: Observable<BlogResponse> = new Observable();
  blogId = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly blogService: BlogsService,
    private readonly renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.route.paramMap.subscribe((params) => {
      this.blogId = params.get('id')!;
      this.blog$ = this.blogService.getById(this.blogId);
    });
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
}
