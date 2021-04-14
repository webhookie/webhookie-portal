import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebhookEmptyComponent } from './webhook-empty.component';

describe('WebhookEmptyComponent', () => {
  let component: WebhookEmptyComponent;
  let fixture: ComponentFixture<WebhookEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebhookEmptyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebhookEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
