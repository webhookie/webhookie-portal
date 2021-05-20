import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagePayloadComponent } from './message-payload.component';

describe('MessagePayloadComponent', () => {
  let component: MessagePayloadComponent;
  let fixture: ComponentFixture<MessagePayloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagePayloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagePayloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
