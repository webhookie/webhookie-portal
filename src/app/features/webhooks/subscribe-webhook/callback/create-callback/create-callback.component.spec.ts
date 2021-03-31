import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCallbackComponent } from './create-callback.component';

describe('CreateCallbackComponent', () => {
  let component: CreateCallbackComponent;
  let fixture: ComponentFixture<CreateCallbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCallbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
