import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFormCreateComponent } from './new-form-create.component';

describe('NewFormCreateComponent', () => {
  let component: NewFormCreateComponent;
  let fixture: ComponentFixture<NewFormCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFormCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFormCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
