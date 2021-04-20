import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeWithoutDataComponent } from './welcome-without-data.component';

describe('WelcomeWithoutDataComponent', () => {
  let component: WelcomeWithoutDataComponent;
  let fixture: ComponentFixture<WelcomeWithoutDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeWithoutDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeWithoutDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
