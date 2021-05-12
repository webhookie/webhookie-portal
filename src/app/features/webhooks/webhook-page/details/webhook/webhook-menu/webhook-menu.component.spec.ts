import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WebhookMenuComponent} from './webhook-menu.component';

describe('WebhookMenuComponent', () => {
  let component: WebhookMenuComponent;
  let fixture: ComponentFixture<WebhookMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebhookMenuComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebhookMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
