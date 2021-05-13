import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWebhookGroupComponent } from './create-webhook-group.component';

describe('CreateWebhookGroupComponent', () => {
  let component: CreateWebhookGroupComponent;
  let fixture: ComponentFixture<CreateWebhookGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWebhookGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWebhookGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
