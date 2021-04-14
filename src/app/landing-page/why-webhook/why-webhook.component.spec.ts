import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyWebhookComponent } from './why-webhook.component';

describe('WhyWebhookComponent', () => {
  let component: WhyWebhookComponent;
  let fixture: ComponentFixture<WhyWebhookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyWebhookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyWebhookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
