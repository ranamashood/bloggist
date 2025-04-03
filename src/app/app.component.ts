import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './layout/header/header.component';
import { NgxEditorModule } from 'ngx-editor';
import { provideIcons } from '@ng-icons/core';
import {
  bootstrapHeart,
  bootstrapHeartFill,
  bootstrapReply,
  bootstrapChat,
  bootstrapSortDown,
  bootstrapBookmark,
  bootstrapBookmarkFill,
  bootstrapArrowUp,
  bootstrapShare,
  bootstrapSun,
  bootstrapMoon,
  bootstrapBoxArrowRight,
  bootstrapGear,
  bootstrapHouseDoor,
  bootstrapPersonAdd,
  bootstrapFileText,
} from '@ng-icons/bootstrap-icons';
import { NotificationComponent } from './notification/notification.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NgbModule,
    HeaderComponent,
    NgxEditorModule,
    NotificationComponent,
    ScrollToTopComponent,
  ],
  templateUrl: './app.component.html',
  viewProviders: [
    provideIcons({
      bootstrapHeart,
      bootstrapHeartFill,
      bootstrapReply,
      bootstrapChat,
      bootstrapSortDown,
      bootstrapBookmark,
      bootstrapBookmarkFill,
      bootstrapArrowUp,
      bootstrapShare,
      bootstrapSun,
      bootstrapMoon,
      bootstrapBoxArrowRight,
      bootstrapGear,
      bootstrapHouseDoor,
      bootstrapPersonAdd,
      bootstrapFileText,
    }),
  ],
})
export class AppComponent {
  title = 'bloggist';
}
