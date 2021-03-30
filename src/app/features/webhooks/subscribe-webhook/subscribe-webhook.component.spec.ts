import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeWebhookComponent } from './subscribe-webhook.component';

describe('SubscribeOrderComponent', () => {
  let component: SubscribeWebhookComponent;
  let fixture: ComponentFixture<SubscribeWebhookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribeWebhookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeWebhookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
