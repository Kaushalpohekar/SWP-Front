import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserNavComponent } from './admin-user-nav.component';

describe('AdminUserNavComponent', () => {
  let component: AdminUserNavComponent;
  let fixture: ComponentFixture<AdminUserNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUserNavComponent]
    });
    fixture = TestBed.createComponent(AdminUserNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
