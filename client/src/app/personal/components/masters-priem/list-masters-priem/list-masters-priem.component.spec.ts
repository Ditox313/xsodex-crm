import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMastersPriemComponent } from './list-masters-priem.component';

describe('ListMastersPriemComponent', () => {
  let component: ListMastersPriemComponent;
  let fixture: ComponentFixture<ListMastersPriemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListMastersPriemComponent]
    });
    fixture = TestBed.createComponent(ListMastersPriemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
