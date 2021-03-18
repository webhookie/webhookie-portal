import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleToggleComponent } from './title-toggle.component';

describe('TitleToggleComponent', () => {
  let component: TitleToggleComponent;
  let fixture: ComponentFixture<TitleToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
