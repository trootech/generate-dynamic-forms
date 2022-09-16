import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntriesDetailsComponent } from './entries-details.component';

describe('EntriesDetailsComponent', () => {
  let component: EntriesDetailsComponent;
  let fixture: ComponentFixture<EntriesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntriesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntriesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
