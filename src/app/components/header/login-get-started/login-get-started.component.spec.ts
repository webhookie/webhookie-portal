import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginGetStartedComponent } from './login-get-started.component';

describe('LoginGetStartedComponent', () => {
  let component: LoginGetStartedComponent;
  let fixture: ComponentFixture<LoginGetStartedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginGetStartedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginGetStartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
