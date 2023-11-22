import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSettingAvtoparkComponent } from './add-setting-avtopark.component';

describe('AddSettingAvtoparkComponent', () => {
  let component: AddSettingAvtoparkComponent;
  let fixture: ComponentFixture<AddSettingAvtoparkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSettingAvtoparkComponent]
    });
    fixture = TestBed.createComponent(AddSettingAvtoparkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
