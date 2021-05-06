import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebhookAccessGroupComponent } from './webhook-access-group.component';

describe('WebhookAccessGroupComponent', () => {
  let component: WebhookAccessGroupComponent;
  let fixture: ComponentFixture<WebhookAccessGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebhookAccessGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebhookAccessGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
