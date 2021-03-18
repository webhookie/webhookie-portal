import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallbackUrlComponent } from './callback-url.component';

describe('CallbackUrlComponent', () => {
  let component: CallbackUrlComponent;
  let fixture: ComponentFixture<CallbackUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallbackUrlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallbackUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
