import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientFizComponent } from './add-client-fiz.component';

describe('AddClientFizComponent', () => {
  let component: AddClientFizComponent;
  let fixture: ComponentFixture<AddClientFizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddClientFizComponent]
    });
    fixture = TestBed.createComponent(AddClientFizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
