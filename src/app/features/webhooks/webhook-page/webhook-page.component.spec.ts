import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebhookPageComponent } from './webhook-page.component';

describe('WebhookPageComponent', () => {
  let component: WebhookPageComponent;
  let fixture: ComponentFixture<WebhookPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebhookPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebhookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
