import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuUserProfileComponent } from './au-user-profile.component';

describe('AuUserProfileComponent', () => {
  let component: AuUserProfileComponent;
  let fixture: ComponentFixture<AuUserProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuUserProfileComponent]
    });
    fixture = TestBed.createComponent(AuUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
