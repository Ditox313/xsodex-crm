import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDogovorsClientsLawComponent } from './list-dogovors-clients-law.component';

describe('ListDogovorsClientsLawComponent', () => {
  let component: ListDogovorsClientsLawComponent;
  let fixture: ComponentFixture<ListDogovorsClientsLawComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDogovorsClientsLawComponent]
    });
    fixture = TestBed.createComponent(ListDogovorsClientsLawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
