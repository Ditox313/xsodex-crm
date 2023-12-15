import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBookingsClientLawComponent } from './list-bookings-client-law.component';

describe('ListBookingsClientLawComponent', () => {
  let component: ListBookingsClientLawComponent;
  let fixture: ComponentFixture<ListBookingsClientLawComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBookingsClientLawComponent]
    });
    fixture = TestBed.createComponent(ListBookingsClientLawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
