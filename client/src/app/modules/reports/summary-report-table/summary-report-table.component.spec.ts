import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryReportTableComponent } from './summary-report-table.component';

describe('SummaryReportTableComponent', () => {
  let component: SummaryReportTableComponent;
  let fixture: ComponentFixture<SummaryReportTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryReportTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryReportTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
