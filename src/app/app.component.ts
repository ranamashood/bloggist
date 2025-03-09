import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './layout/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgbModule, HeaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'bloggist';
}
