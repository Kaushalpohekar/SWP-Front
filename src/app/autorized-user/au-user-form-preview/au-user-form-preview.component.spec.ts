import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuUserFormPreviewComponent } from './au-user-form-preview.component';

describe('AuUserFormPreviewComponent', () => {
  let component: AuUserFormPreviewComponent;
  let fixture: ComponentFixture<AuUserFormPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuUserFormPreviewComponent]
    });
    fixture = TestBed.createComponent(AuUserFormPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
