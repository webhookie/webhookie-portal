import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRateSubLinksComponent } from './order-rate-sub-links.component';

describe('OrderRateSubLinksComponent', () => {
  let component: OrderRateSubLinksComponent;
  let fixture: ComponentFixture<OrderRateSubLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderRateSubLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderRateSubLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
