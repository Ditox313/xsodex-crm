import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClientsLawComponent } from './list-clients-law.component';

describe('ListClientsLawComponent', () => {
  let component: ListClientsLawComponent;
  let fixture: ComponentFixture<ListClientsLawComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListClientsLawComponent]
    });
    fixture = TestBed.createComponent(ListClientsLawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
