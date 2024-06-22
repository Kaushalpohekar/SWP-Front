import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuUserApproveComponent } from './au-user-approve.component';

describe('AuUserApproveComponent', () => {
  let component: AuUserApproveComponent;
  let fixture: ComponentFixture<AuUserApproveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuUserApproveComponent]
    });
    fixture = TestBed.createComponent(AuUserApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
