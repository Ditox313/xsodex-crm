import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSettingsAvtoparkComponent } from './show-settings-avtopark.component';

describe('ShowSettingsAvtoparkComponent', () => {
  let component: ShowSettingsAvtoparkComponent;
  let fixture: ComponentFixture<ShowSettingsAvtoparkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowSettingsAvtoparkComponent]
    });
    fixture = TestBed.createComponent(ShowSettingsAvtoparkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
