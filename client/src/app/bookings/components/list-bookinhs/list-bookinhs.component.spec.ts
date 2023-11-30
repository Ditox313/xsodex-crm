import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBookinhsComponent } from './list-bookinhs.component';

describe('ListBookinhsComponent', () => {
  let component: ListBookinhsComponent;
  let fixture: ComponentFixture<ListBookinhsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBookinhsComponent]
    });
    fixture = TestBed.createComponent(ListBookinhsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
