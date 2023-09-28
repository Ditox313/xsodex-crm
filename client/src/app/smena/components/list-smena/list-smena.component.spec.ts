import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSmenaComponent } from './list-smena.component';

describe('ListSmenaComponent', () => {
  let component: ListSmenaComponent;
  let fixture: ComponentFixture<ListSmenaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSmenaComponent]
    });
    fixture = TestBed.createComponent(ListSmenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
