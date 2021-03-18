import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMenuComponent } from './order-menu.component';

describe('OrderMenuComponent', () => {
  let component: OrderMenuComponent;
  let fixture: ComponentFixture<OrderMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
