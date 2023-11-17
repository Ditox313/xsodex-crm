import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDogovorClientFizComponent } from './add-dogovor-client-fiz.component';

describe('AddDogovorClientFizComponent', () => {
  let component: AddDogovorClientFizComponent;
  let fixture: ComponentFixture<AddDogovorClientFizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDogovorClientFizComponent]
    });
    fixture = TestBed.createComponent(AddDogovorClientFizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
