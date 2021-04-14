import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteLabelComponent } from './white-label.component';

describe('WhiteLabelComponent', () => {
  let component: WhiteLabelComponent;
  let fixture: ComponentFixture<WhiteLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhiteLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhiteLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
