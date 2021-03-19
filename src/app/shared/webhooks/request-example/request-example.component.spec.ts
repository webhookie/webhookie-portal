import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestExampleComponent } from './request-example.component';

describe('RequestExampleComponent', () => {
  let component: RequestExampleComponent;
  let fixture: ComponentFixture<RequestExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
