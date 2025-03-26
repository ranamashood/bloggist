import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewUserComponent } from './preview-user.component';

describe('PreviewUserComponent', () => {
  let component: PreviewUserComponent;
  let fixture: ComponentFixture<PreviewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
