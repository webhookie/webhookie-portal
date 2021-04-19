import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimestampFilterComponent } from './timestamp-filter.component';

describe('TimestampFilterComponent', () => {
  let component: TimestampFilterComponent;
  let fixture: ComponentFixture<TimestampFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimestampFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimestampFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
