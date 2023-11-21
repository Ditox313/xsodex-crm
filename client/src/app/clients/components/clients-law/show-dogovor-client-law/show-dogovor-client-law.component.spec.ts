import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDogovorClientLawComponent } from './show-dogovor-client-law.component';

describe('ShowDogovorClientLawComponent', () => {
  let component: ShowDogovorClientLawComponent;
  let fixture: ComponentFixture<ShowDogovorClientLawComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowDogovorClientLawComponent]
    });
    fixture = TestBed.createComponent(ShowDogovorClientLawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
