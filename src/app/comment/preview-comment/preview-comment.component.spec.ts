import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewCommentComponent } from './preview-comment.component';

describe('PreviewCommentComponent', () => {
  let component: PreviewCommentComponent;
  let fixture: ComponentFixture<PreviewCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewCommentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
