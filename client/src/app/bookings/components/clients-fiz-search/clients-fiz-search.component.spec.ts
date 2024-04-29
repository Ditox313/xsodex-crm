import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsFizSearchComponent } from './clients-fiz-search.component';

describe('ClientsFizSearchComponent', () => {
  let component: ClientsFizSearchComponent;
  let fixture: ComponentFixture<ClientsFizSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsFizSearchComponent]
    });
    fixture = TestBed.createComponent(ClientsFizSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
