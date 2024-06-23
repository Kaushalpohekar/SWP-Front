import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBreadcrumsComponent } from './admin-breadcrums.component';

describe('AdminBreadcrumsComponent', () => {
  let component: AdminBreadcrumsComponent;
  let fixture: ComponentFixture<AdminBreadcrumsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminBreadcrumsComponent]
    });
    fixture = TestBed.createComponent(AdminBreadcrumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
