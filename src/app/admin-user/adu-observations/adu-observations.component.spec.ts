import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AduObservationsComponent } from './adu-observations.component';

describe('AduObservationsComponent', () => {
  let component: AduObservationsComponent;
  let fixture: ComponentFixture<AduObservationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AduObservationsComponent]
    });
    fixture = TestBed.createComponent(AduObservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
