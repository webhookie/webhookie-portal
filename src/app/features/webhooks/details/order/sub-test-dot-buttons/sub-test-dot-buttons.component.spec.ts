import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTestDotButtonsComponent } from './sub-test-dot-buttons.component';

describe('SubTestDotButtonsComponent', () => {
  let component: SubTestDotButtonsComponent;
  let fixture: ComponentFixture<SubTestDotButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubTestDotButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubTestDotButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
