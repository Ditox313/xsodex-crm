import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSettingGlobalComponent } from './show-setting-global.component';

describe('ShowSettingGlobalComponent', () => {
  let component: ShowSettingGlobalComponent;
  let fixture: ComponentFixture<ShowSettingGlobalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowSettingGlobalComponent]
    });
    fixture = TestBed.createComponent(ShowSettingGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
