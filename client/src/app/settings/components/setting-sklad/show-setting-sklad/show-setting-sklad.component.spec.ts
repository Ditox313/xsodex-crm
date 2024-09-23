import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSettingSkladComponent } from './show-setting-sklad.component';

describe('ShowSettingSkladComponent', () => {
  let component: ShowSettingSkladComponent;
  let fixture: ComponentFixture<ShowSettingSkladComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowSettingSkladComponent]
    });
    fixture = TestBed.createComponent(ShowSettingSkladComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
