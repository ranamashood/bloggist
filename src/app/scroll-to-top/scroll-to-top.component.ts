import { NgClass } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-scroll-to-top',
  imports: [NgIcon, NgClass],
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.css',
})
export class ScrollToTopComponent {
  isVisible = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    const screenHeight = window.screen.height;

    this.isVisible =
      document.body.scrollTop > screenHeight ||
      document.documentElement.scrollTop > screenHeight;
  }

  scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
