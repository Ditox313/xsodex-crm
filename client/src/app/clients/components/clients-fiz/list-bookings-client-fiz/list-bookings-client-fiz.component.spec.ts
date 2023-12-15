import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBookingsClientFizComponent } from './list-bookings-client-fiz.component';

describe('ListBookingsClientFizComponent', () => {
  let component: ListBookingsClientFizComponent;
  let fixture: ComponentFixture<ListBookingsClientFizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBookingsClientFizComponent]
    });
    fixture = TestBed.createComponent(ListBookingsClientFizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
