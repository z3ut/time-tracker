import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsTimeStatsComponent } from './projects-time-stats.component';

describe('ProjectsTimeStatsComponent', () => {
  let component: ProjectsTimeStatsComponent;
  let fixture: ComponentFixture<ProjectsTimeStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsTimeStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsTimeStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
