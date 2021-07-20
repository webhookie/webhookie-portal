import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWebhookApiComponent } from './create-webhook-api.component';

describe('CreateWebhookApiComponent', () => {
  let component: CreateWebhookApiComponent;
  let fixture: ComponentFixture<CreateWebhookApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWebhookApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWebhookApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
