import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogAnalyticsComponent } from './blog-analytics.component';

describe('BlogAnalyticsComponent', () => {
  let component: BlogAnalyticsComponent;
  let fixture: ComponentFixture<BlogAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogAnalyticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
