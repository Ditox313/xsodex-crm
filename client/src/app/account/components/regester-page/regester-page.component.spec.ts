import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegesterPageComponent } from './regester-page.component';

describe('RegesterPageComponent', () => {
  let component: RegesterPageComponent;
  let fixture: ComponentFixture<RegesterPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegesterPageComponent]
    });
    fixture = TestBed.createComponent(RegesterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
