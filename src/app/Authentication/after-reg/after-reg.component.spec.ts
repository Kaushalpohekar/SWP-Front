import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterRegComponent } from './after-reg.component';

describe('AfterRegComponent', () => {
  let component: AfterRegComponent;
  let fixture: ComponentFixture<AfterRegComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AfterRegComponent]
    });
    fixture = TestBed.createComponent(AfterRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
