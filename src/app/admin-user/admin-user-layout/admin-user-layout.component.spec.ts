import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserLayoutComponent } from './admin-user-layout.component';

describe('AdminUserLayoutComponent', () => {
  let component: AdminUserLayoutComponent;
  let fixture: ComponentFixture<AdminUserLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUserLayoutComponent]
    });
    fixture = TestBed.createComponent(AdminUserLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
