import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuUserFormComponent } from './au-user-form.component';

describe('AuUserFormComponent', () => {
  let component: AuUserFormComponent;
  let fixture: ComponentFixture<AuUserFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuUserFormComponent]
    });
    fixture = TestBed.createComponent(AuUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
