import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDogovorClientLawComponent } from './add-dogovor-client-law.component';

describe('AddDogovorClientLawComponent', () => {
  let component: AddDogovorClientLawComponent;
  let fixture: ComponentFixture<AddDogovorClientLawComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDogovorClientLawComponent]
    });
    fixture = TestBed.createComponent(AddDogovorClientLawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
