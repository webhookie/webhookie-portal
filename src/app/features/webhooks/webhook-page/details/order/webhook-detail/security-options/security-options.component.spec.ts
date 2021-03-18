import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityOptionsComponent } from './security-options.component';

describe('SecurityOptionsComponent', () => {
  let component: SecurityOptionsComponent;
  let fixture: ComponentFixture<SecurityOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
