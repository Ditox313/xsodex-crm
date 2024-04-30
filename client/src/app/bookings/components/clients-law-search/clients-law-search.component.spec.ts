import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsLawSearchComponent } from './clients-law-search.component';

describe('ClientsLawSearchComponent', () => {
  let component: ClientsLawSearchComponent;
  let fixture: ComponentFixture<ClientsLawSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsLawSearchComponent]
    });
    fixture = TestBed.createComponent(ClientsLawSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
