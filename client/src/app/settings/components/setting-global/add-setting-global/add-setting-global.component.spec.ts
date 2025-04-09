import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSettingGlobalComponent } from './add-setting-global.component';

describe('AddSettingGlobalComponent', () => {
  let component: AddSettingGlobalComponent;
  let fixture: ComponentFixture<AddSettingGlobalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSettingGlobalComponent]
    });
    fixture = TestBed.createComponent(AddSettingGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
