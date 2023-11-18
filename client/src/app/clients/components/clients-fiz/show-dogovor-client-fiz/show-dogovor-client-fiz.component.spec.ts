import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDogovorClientFizComponent } from './show-dogovor-client-fiz.component';

describe('ShowDogovorClientFizComponent', () => {
  let component: ShowDogovorClientFizComponent;
  let fixture: ComponentFixture<ShowDogovorClientFizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowDogovorClientFizComponent]
    });
    fixture = TestBed.createComponent(ShowDogovorClientFizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
