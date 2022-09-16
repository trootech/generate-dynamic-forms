import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpadateComponent } from './form-upadate.component';

describe('FormUpadateComponent', () => {
  let component: FormUpadateComponent;
  let fixture: ComponentFixture<FormUpadateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUpadateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUpadateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
