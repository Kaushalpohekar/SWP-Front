import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendResetMailComponent } from './send-reset-mail.component';

describe('SendResetMailComponent', () => {
  let component: SendResetMailComponent;
  let fixture: ComponentFixture<SendResetMailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendResetMailComponent]
    });
    fixture = TestBed.createComponent(SendResetMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
