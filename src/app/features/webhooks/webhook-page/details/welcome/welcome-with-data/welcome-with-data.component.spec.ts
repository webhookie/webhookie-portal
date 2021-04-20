import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeWithDataComponent } from './welcome-with-data.component';

describe('WelcomeWithDataComponent', () => {
  let component: WelcomeWithDataComponent;
  let fixture: ComponentFixture<WelcomeWithDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeWithDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeWithDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
