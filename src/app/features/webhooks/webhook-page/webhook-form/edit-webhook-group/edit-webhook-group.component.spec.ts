import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWebhookGroupComponent } from './edit-webhook-group.component';

describe('EditWebhookGroupComponent', () => {
  let component: EditWebhookGroupComponent;
  let fixture: ComponentFixture<EditWebhookGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWebhookGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWebhookGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
