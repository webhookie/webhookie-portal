import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Webhook1Component } from './webhook1.component';

describe('Webhook1Component', () => {
  let component: Webhook1Component;
  let fixture: ComponentFixture<Webhook1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Webhook1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Webhook1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
