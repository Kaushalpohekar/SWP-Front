import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserHomeComponent } from './admin-user-home.component';

describe('AdminUserHomeComponent', () => {
  let component: AdminUserHomeComponent;
  let fixture: ComponentFixture<AdminUserHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUserHomeComponent]
    });
    fixture = TestBed.createComponent(AdminUserHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
