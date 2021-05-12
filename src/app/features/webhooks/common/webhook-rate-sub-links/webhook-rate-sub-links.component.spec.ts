import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WebhookRateSubLinksComponent} from './webhook-rate-sub-links.component';

describe('OrderRateSubLinksComponent', () => {
  let component: WebhookRateSubLinksComponent;
  let fixture: ComponentFixture<WebhookRateSubLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebhookRateSubLinksComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebhookRateSubLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
