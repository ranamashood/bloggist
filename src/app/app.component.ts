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

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgbModule, HeaderComponent, NgxEditorModule],
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
