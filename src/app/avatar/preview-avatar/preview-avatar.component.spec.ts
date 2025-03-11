import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewAvatarComponent } from './preview-avatar.component';

describe('PreviewAvatarComponent', () => {
  let component: PreviewAvatarComponent;
  let fixture: ComponentFixture<PreviewAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewAvatarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
