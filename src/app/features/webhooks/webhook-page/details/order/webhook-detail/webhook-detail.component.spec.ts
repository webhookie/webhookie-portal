import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WebhookDetailComponent} from './webhook-detail.component';

describe('WebhookDetailComponent', () => {
  let component: WebhookDetailComponent;
  let fixture: ComponentFixture<WebhookDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebhookDetailComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebhookDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
