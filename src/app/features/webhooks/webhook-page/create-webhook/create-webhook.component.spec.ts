import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWebhookComponent } from './create-webhook.component';

describe('CreateWebhookComponent', () => {
  let component: CreateWebhookComponent;
  let fixture: ComponentFixture<CreateWebhookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWebhookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWebhookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
