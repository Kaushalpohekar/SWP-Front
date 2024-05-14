import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitComponent } from './permit.component';

describe('PermitComponent', () => {
  let component: PermitComponent;
  let fixture: ComponentFixture<PermitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PermitComponent]
    });
    fixture = TestBed.createComponent(PermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
