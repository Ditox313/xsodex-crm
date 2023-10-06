import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSmenaComponent } from './show-smena.component';

describe('ShowSmenaComponent', () => {
  let component: ShowSmenaComponent;
  let fixture: ComponentFixture<ShowSmenaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowSmenaComponent]
    });
    fixture = TestBed.createComponent(ShowSmenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
