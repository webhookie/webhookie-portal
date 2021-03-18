import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeOrderComponent } from './subscribe-order.component';

describe('SubscribeOrderComponent', () => {
  let component: SubscribeOrderComponent;
  let fixture: ComponentFixture<SubscribeOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribeOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
