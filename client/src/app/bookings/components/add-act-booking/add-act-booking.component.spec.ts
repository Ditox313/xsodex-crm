import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActBookingComponent } from './add-act-booking.component';

describe('AddActBookingComponent', () => {
  let component: AddActBookingComponent;
  let fixture: ComponentFixture<AddActBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddActBookingComponent]
    });
    fixture = TestBed.createComponent(AddActBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
