import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTrustedPersoneComponent } from './show-trusted-persone.component';

describe('ShowTrustedPersoneComponent', () => {
  let component: ShowTrustedPersoneComponent;
  let fixture: ComponentFixture<ShowTrustedPersoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowTrustedPersoneComponent]
    });
    fixture = TestBed.createComponent(ShowTrustedPersoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
