import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BlogsService } from '../../blogs.service';

@Component({
  selector: 'app-add-blog',
  imports: [FormsModule],
  templateUrl: './add-blog.component.html',
})
export class AddBlogComponent {
  constructor(private readonly blogService: BlogsService) {}

  title = '';
  desc = '';

  onAddBlog() {
    this.blogService
      .create({
        title: this.title,
        desc: this.desc,
      })
      .subscribe({
        next: () => {
          this.title = '';
          this.desc = '';
        },
      });
  }
}
