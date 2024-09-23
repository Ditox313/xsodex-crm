import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSettingSkladComponent } from './add-setting-sklad.component';

describe('AddSettingSkladComponent', () => {
  let component: AddSettingSkladComponent;
  let fixture: ComponentFixture<AddSettingSkladComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSettingSkladComponent]
    });
    fixture = TestBed.createComponent(AddSettingSkladComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
