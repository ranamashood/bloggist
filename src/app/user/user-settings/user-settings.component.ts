import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-user-settings',
  imports: [FormsModule],
  templateUrl: './user-settings.component.html',
})
export class UserSettingsComponent {
  currentUser$ = inject(UserService).currentUser$;

  userId = '';
  headline = '';
  banner = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id')!;
    });

    if (isPlatformBrowser(this.platformId)) {
      this.currentUser$.subscribe((currentUser) => {
        this.headline = currentUser!.settings.headline;
        this.banner = currentUser!.settings.banner;
      });
    }
  }

  submit() {
    this.userService
      .update({
        settings: {
          headline: this.headline,
          banner: this.banner,
        },
      })
      .subscribe();
  }
}
