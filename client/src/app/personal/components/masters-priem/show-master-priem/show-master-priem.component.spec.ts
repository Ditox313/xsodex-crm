import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMasterPriemComponent } from './show-master-priem.component';

describe('ShowMasterPriemComponent', () => {
  let component: ShowMasterPriemComponent;
  let fixture: ComponentFixture<ShowMasterPriemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowMasterPriemComponent]
    });
    fixture = TestBed.createComponent(ShowMasterPriemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
