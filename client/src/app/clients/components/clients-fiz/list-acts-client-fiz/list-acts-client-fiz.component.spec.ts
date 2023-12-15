import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActsClientFizComponent } from './list-acts-client-fiz.component';

describe('ListActsClientFizComponent', () => {
  let component: ListActsClientFizComponent;
  let fixture: ComponentFixture<ListActsClientFizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListActsClientFizComponent]
    });
    fixture = TestBed.createComponent(ListActsClientFizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
