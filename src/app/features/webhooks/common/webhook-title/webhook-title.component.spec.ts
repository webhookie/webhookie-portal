import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WebhookTitleComponent} from './webhook-title.component';

describe('WebhookTitleComponent', () => {
  let component: WebhookTitleComponent;
  let fixture: ComponentFixture<WebhookTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebhookTitleComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebhookTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
