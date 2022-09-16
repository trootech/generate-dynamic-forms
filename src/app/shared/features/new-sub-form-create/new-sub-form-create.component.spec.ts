import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSubFormCreateComponent } from './new-sub-form-create.component';

describe('NewSubFormCreateComponent', () => {
  let component: NewSubFormCreateComponent;
  let fixture: ComponentFixture<NewSubFormCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSubFormCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSubFormCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
