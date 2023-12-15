import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActsClientLawComponent } from './list-acts-client-law.component';

describe('ListActsClientLawComponent', () => {
  let component: ListActsClientLawComponent;
  let fixture: ComponentFixture<ListActsClientLawComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListActsClientLawComponent]
    });
    fixture = TestBed.createComponent(ListActsClientLawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
