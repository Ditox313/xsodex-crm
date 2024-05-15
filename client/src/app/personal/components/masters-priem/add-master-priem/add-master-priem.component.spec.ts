import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMasterPriemComponent } from './add-master-priem.component';

describe('AddMasterPriemComponent', () => {
  let component: AddMasterPriemComponent;
  let fixture: ComponentFixture<AddMasterPriemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMasterPriemComponent]
    });
    fixture = TestBed.createComponent(AddMasterPriemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
