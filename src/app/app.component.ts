import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './layout/header/header.component';
import { NgxEditorModule } from 'ngx-editor';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgbModule, HeaderComponent, NgxEditorModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'bloggist';
}
