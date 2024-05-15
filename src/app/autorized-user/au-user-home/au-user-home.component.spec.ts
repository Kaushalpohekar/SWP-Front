import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuUserHomeComponent } from './au-user-home.component';

describe('AuUserHomeComponent', () => {
  let component: AuUserHomeComponent;
  let fixture: ComponentFixture<AuUserHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuUserHomeComponent]
    });
    fixture = TestBed.createComponent(AuUserHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
