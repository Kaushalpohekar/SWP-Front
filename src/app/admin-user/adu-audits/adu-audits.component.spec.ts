import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AduAuditsComponent } from './adu-audits.component';

describe('AduAuditsComponent', () => {
  let component: AduAuditsComponent;
  let fixture: ComponentFixture<AduAuditsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AduAuditsComponent]
    });
    fixture = TestBed.createComponent(AduAuditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
