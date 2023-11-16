import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowClientFizComponent } from './show-client-fiz.component';

describe('ShowClientFizComponent', () => {
  let component: ShowClientFizComponent;
  let fixture: ComponentFixture<ShowClientFizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowClientFizComponent]
    });
    fixture = TestBed.createComponent(ShowClientFizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
