import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWebhookApiComponent } from './edit-webhook-api.component';

describe('EditWebhookApiComponent', () => {
  let component: EditWebhookApiComponent;
  let fixture: ComponentFixture<EditWebhookApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWebhookApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWebhookApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
