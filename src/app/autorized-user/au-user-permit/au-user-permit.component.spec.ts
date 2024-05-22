import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuUserPermitComponent } from './au-user-permit.component';

describe('AuUserPermitComponent', () => {
  let component: AuUserPermitComponent;
  let fixture: ComponentFixture<AuUserPermitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuUserPermitComponent]
    });
    fixture = TestBed.createComponent(AuUserPermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
