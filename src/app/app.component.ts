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
} from '@ng-icons/bootstrap-icons';
import { NotificationComponent } from './notification/notification.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NgbModule,
    HeaderComponent,
    NgxEditorModule,
    NotificationComponent,
  ],
  templateUrl: './app.component.html',
  viewProviders: [
    provideIcons({
      bootstrapHeart,
      bootstrapHeartFill,
      bootstrapReply,
      bootstrapChat,
      bootstrapSortDown,
    }),
  ],
})
export class AppComponent {
  title = 'bloggist';
}
