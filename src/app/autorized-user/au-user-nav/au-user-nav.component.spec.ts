import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuUserNavComponent } from './au-user-nav.component';

describe('AuUserNavComponent', () => {
  let component: AuUserNavComponent;
  let fixture: ComponentFixture<AuUserNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuUserNavComponent]
    });
    fixture = TestBed.createComponent(AuUserNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
