import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuUserLayoutComponent } from './au-user-layout.component';

describe('AuUserLayoutComponent', () => {
  let component: AuUserLayoutComponent;
  let fixture: ComponentFixture<AuUserLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuUserLayoutComponent]
    });
    fixture = TestBed.createComponent(AuUserLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
