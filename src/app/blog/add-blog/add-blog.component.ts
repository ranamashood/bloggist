import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BlogsService } from '../../blogs.service';
import { EditorComponent } from '../../editor/editor.component';
import { EditorService } from '../../editor.service';

@Component({
  selector: 'app-add-blog',
  imports: [FormsModule, EditorComponent],
  templateUrl: './add-blog.component.html',
})
export class AddBlogComponent {
  constructor(
    private readonly blogService: BlogsService,
    private readonly editorService: EditorService,
  ) {}

  title = '';

  onAddBlog() {
    this.blogService
      .create({
        title: this.title,
        desc: this.editorService.getContent(),
      })
      .subscribe({
        next: () => {
          this.title = '';
          this.editorService.setContent('');
        },
      });
  }
}
