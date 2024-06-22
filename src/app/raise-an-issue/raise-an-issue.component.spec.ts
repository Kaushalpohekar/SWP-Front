import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseAnIssueComponent } from './raise-an-issue.component';

describe('RaiseAnIssueComponent', () => {
  let component: RaiseAnIssueComponent;
  let fixture: ComponentFixture<RaiseAnIssueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RaiseAnIssueComponent]
    });
    fixture = TestBed.createComponent(RaiseAnIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
