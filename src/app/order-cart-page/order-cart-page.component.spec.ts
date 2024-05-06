import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCartPageComponent } from './order-cart-page.component';

describe('OrderCartPageComponent', () => {
  let component: OrderCartPageComponent;
  let fixture: ComponentFixture<OrderCartPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderCartPageComponent]
    });
    fixture = TestBed.createComponent(OrderCartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
