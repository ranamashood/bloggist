import {
  Component,
  ElementRef,
  HostListener,
  inject,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { UserService } from '../../user.service';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { PreviewAvatarComponent } from '../../avatar/preview-avatar/preview-avatar.component';
import { ToggleThemeComponent } from '../../toggle-theme/toggle-theme.component';
import { NgIcon } from '@ng-icons/core';
import { SearchBarComponent } from '../../search-bar/search-bar.component';
import { filter } from 'rxjs';
import { BlogsService } from '../../blogs.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    AsyncPipe,
    PreviewAvatarComponent,
    ToggleThemeComponent,
    NgIcon,
    SearchBarComponent,
    NgIf,
    NgClass,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @ViewChild('scrollIndicator', { static: false }) scrollIndicator!: ElementRef;
  currentUser$ = inject(UserService).currentUser$;
  blogDivider$ = inject(BlogsService).blogDivider$;
  blogDivider = 0;
  isBlogRoute = false;

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly blogService: BlogsService,
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isBlogRoute =
          this.router.url.startsWith('/blog/') && this.router.url.length === 30;
      });

    this.blogDivider$.subscribe((blogDivider) => {
      if (blogDivider) {
        this.blogDivider = blogDivider;
      }
    });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (!this.isBlogRoute) {
      return;
    }

    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height = this.blogDivider - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    this.scrollIndicator.nativeElement.style.width = `${scrolled}%`;
  }

  onLogout() {
    this.userService.logout();
  }
}
