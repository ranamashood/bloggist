import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { SwitchComponent } from '../switch/switch.component';

@Component({
  selector: 'app-toggle-theme',
  imports: [SwitchComponent],
  templateUrl: './toggle-theme.component.html',
})
export class ToggleThemeComponent {
  theme = 'light';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.theme =
        localStorage.getItem('theme') ||
        document.documentElement.getAttribute('data-bs-theme') ||
        this.theme;

      this.setTheme(this.theme);
    }
  }

  toggleTheme() {
    this.setTheme(this.theme === 'light' ? 'dark' : 'light');
  }

  setTheme(theme: string) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    this.theme = theme;
  }
}
