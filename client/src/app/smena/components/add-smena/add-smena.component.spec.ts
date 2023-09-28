import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSmenaComponent } from './add-smena.component';

describe('AddSmenaComponent', () => {
  let component: AddSmenaComponent;
  let fixture: ComponentFixture<AddSmenaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSmenaComponent]
    });
    fixture = TestBed.createComponent(AddSmenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
