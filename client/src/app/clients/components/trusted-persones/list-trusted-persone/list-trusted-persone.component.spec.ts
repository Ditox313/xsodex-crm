import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTrustedPersoneComponent } from './list-trusted-persone.component';

describe('ListTrustedPersoneComponent', () => {
  let component: ListTrustedPersoneComponent;
  let fixture: ComponentFixture<ListTrustedPersoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTrustedPersoneComponent]
    });
    fixture = TestBed.createComponent(ListTrustedPersoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
