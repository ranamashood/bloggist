import { isPlatformBrowser, NgClass, NgFor } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-table-of-content',
  imports: [NgFor, NgClass],
  templateUrl: './table-of-content.component.html',
  styleUrl: './table-of-content.component.css',
})
export class TableOfContentComponent {
  @Input() blogId = '';
  @Input() html = '';
  headings: { indent: string; id: string; text: string }[] = [];
  activeHeading = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.headings = this.getHeadings();
    }
  }

  getHeadings() {
    const parser = new DOMParser();
    const dom = parser.parseFromString(this.html, 'text/html');
    const headings = dom.querySelectorAll('h1, h2, h3, h4, h5, h6');

    const headingsArray = Array.from(headings);

    const minIndent = Math.min(
      ...headingsArray.map((heading) => parseInt(heading.tagName[1])),
    );

    return headingsArray.map((heading) => ({
      indent: `${(parseInt(heading.tagName[1]) - minIndent) * 15}px`,
      id: `/blog/${this.blogId}#${heading.textContent!.toLowerCase().replace(/\s+/g, '-')}`,
      text: heading.textContent!,
    }));
  }

  setActive(id: string) {
    this.activeHeading = id;
  }
}
