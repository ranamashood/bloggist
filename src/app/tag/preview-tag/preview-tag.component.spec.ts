import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewTagComponent } from './preview-tag.component';

describe('PreviewTagComponent', () => {
  let component: PreviewTagComponent;
  let fixture: ComponentFixture<PreviewTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewTagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
