import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsActivitiesStatsComponent } from './projects-activities-stats.component';

describe('ProjectsActivitiesStatsComponent', () => {
  let component: ProjectsActivitiesStatsComponent;
  let fixture: ComponentFixture<ProjectsActivitiesStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsActivitiesStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsActivitiesStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
