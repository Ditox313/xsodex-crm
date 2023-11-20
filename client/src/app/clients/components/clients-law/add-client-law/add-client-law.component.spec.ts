import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientLawComponent } from './add-client-law.component';

describe('AddClientLawComponent', () => {
  let component: AddClientLawComponent;
  let fixture: ComponentFixture<AddClientLawComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddClientLawComponent]
    });
    fixture = TestBed.createComponent(AddClientLawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
