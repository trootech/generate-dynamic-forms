import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicformItemComponent } from './dynamicform-item.component';

describe('DynamicformItemComponent', () => {
  let component: DynamicformItemComponent;
  let fixture: ComponentFixture<DynamicformItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicformItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicformItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
