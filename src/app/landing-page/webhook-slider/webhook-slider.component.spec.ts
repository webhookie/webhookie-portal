import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebhookSliderComponent } from './webhook-slider.component';

describe('WebhookSliderComponent', () => {
  let component: WebhookSliderComponent;
  let fixture: ComponentFixture<WebhookSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebhookSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebhookSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
