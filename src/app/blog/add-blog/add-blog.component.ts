import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-blog',
  imports: [FormsModule],
  templateUrl: './add-blog.component.html',
})
export class AddBlogComponent {
  title = '';
  desc = '';

  addNewBlog() {
    console.log(this.title);
    console.log(this.desc);
  }
}
