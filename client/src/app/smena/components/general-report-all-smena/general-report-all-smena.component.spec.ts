import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralReportAllSmenaComponent } from './general-report-all-smena.component';

describe('GeneralReportAllSmenaComponent', () => {
  let component: GeneralReportAllSmenaComponent;
  let fixture: ComponentFixture<GeneralReportAllSmenaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralReportAllSmenaComponent]
    });
    fixture = TestBed.createComponent(GeneralReportAllSmenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
