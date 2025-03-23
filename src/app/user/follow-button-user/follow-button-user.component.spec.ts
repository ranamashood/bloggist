import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowButtonUserComponent } from './follow-button-user.component';

describe('FollowButtonUserComponent', () => {
  let component: FollowButtonUserComponent;
  let fixture: ComponentFixture<FollowButtonUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowButtonUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowButtonUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
