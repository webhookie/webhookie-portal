import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessGroupFormComponent } from './access-group-form.component';

describe('CreateAccessGroupComponent', () => {
  let component: AccessGroupFormComponent;
  let fixture: ComponentFixture<AccessGroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessGroupFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
