import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallbackTestComponent } from './callback-test.component';

describe('TestOrderComponent', () => {
  let component: CallbackTestComponent;
  let fixture: ComponentFixture<CallbackTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallbackTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallbackTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
