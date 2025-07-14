import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrustedPersoneComponent } from './add-trusted-persone.component';

describe('AddTrustedPersoneComponent', () => {
  let component: AddTrustedPersoneComponent;
  let fixture: ComponentFixture<AddTrustedPersoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTrustedPersoneComponent]
    });
    fixture = TestBed.createComponent(AddTrustedPersoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
