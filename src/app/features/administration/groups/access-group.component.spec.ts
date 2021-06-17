import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessGroupComponent } from './access-group.component';

describe('ConsumerComponent', () => {
  let component: AccessGroupComponent;
  let fixture: ComponentFixture<AccessGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
