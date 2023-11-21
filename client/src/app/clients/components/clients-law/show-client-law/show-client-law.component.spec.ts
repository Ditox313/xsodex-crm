import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowClientLawComponent } from './show-client-law.component';

describe('ShowClientLawComponent', () => {
  let component: ShowClientLawComponent;
  let fixture: ComponentFixture<ShowClientLawComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowClientLawComponent]
    });
    fixture = TestBed.createComponent(ShowClientLawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
