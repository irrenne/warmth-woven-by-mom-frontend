import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderEditReviewPageComponent } from './admin-order-edit-review-page.component';

describe('AdminOrderEditReviewPageComponent', () => {
  let component: AdminOrderEditReviewPageComponent;
  let fixture: ComponentFixture<AdminOrderEditReviewPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOrderEditReviewPageComponent]
    });
    fixture = TestBed.createComponent(AdminOrderEditReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
