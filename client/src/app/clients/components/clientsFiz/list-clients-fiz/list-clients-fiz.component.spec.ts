import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClientsFizComponent } from './list-clients-fiz.component';

describe('ListClientsFizComponent', () => {
  let component: ListClientsFizComponent;
  let fixture: ComponentFixture<ListClientsFizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListClientsFizComponent]
    });
    fixture = TestBed.createComponent(ListClientsFizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
