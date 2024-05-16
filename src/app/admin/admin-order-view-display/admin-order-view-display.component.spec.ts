import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderViewDisplayComponent } from './admin-order-view-display.component';

describe('AdminOrderViewDisplayComponent', () => {
  let component: AdminOrderViewDisplayComponent;
  let fixture: ComponentFixture<AdminOrderViewDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOrderViewDisplayComponent]
    });
    fixture = TestBed.createComponent(AdminOrderViewDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
