import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDogovorsClientsFizComponent } from './list-dogovors-clients-fiz.component';

describe('ListDogovorsClientsFizComponent', () => {
  let component: ListDogovorsClientsFizComponent;
  let fixture: ComponentFixture<ListDogovorsClientsFizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDogovorsClientsFizComponent]
    });
    fixture = TestBed.createComponent(ListDogovorsClientsFizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
