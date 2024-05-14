import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLayoutComponentComponent } from './user-layout-component.component';

describe('UserLayoutComponentComponent', () => {
  let component: UserLayoutComponentComponent;
  let fixture: ComponentFixture<UserLayoutComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLayoutComponentComponent]
    });
    fixture = TestBed.createComponent(UserLayoutComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
