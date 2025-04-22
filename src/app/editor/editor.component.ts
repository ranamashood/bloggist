import { isPlatformBrowser, NgIf } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { EditorService } from '../editor.service';

@Component({
  selector: 'app-editor',
  imports: [NgxEditorModule, FormsModule, NgIf],
  templateUrl: './editor.component.html',
})
export class EditorComponent {
  editor!: Editor;
  @Input() html = '';
  @Input() placeholder = '';
  toolbar: Toolbar = [
    // default value
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    // or, set options for link:
    //[{ link: { showOpenInNewTab: false } }, 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear', 'indent', 'outdent'],
    ['superscript', 'subscript'],
    ['undo', 'redo'],
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private readonly editorService: EditorService,
  ) {}

  onChange(html: object) {
    this.editorService.setContent(html.toString());
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.editor = new Editor();
    }
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor?.destroy();
  }
}
