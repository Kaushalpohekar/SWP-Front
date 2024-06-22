import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuUserRejectComponent } from './au-user-reject.component';

describe('AuUserRejectComponent', () => {
  let component: AuUserRejectComponent;
  let fixture: ComponentFixture<AuUserRejectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuUserRejectComponent]
    });
    fixture = TestBed.createComponent(AuUserRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
