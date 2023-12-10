import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllClientsSearchComponent } from './all-clients-search.component';

describe('AllClientsSearchComponent', () => {
  let component: AllClientsSearchComponent;
  let fixture: ComponentFixture<AllClientsSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllClientsSearchComponent]
    });
    fixture = TestBed.createComponent(AllClientsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
