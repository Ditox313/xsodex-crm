import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAppLayoutComponent } from './header-app-layout.component';

describe('HeaderAppLayoutComponent', () => {
  let component: HeaderAppLayoutComponent;
  let fixture: ComponentFixture<HeaderAppLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderAppLayoutComponent]
    });
    fixture = TestBed.createComponent(HeaderAppLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
