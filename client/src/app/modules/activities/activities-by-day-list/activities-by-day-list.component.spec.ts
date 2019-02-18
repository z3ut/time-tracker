import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesByDayListComponent } from './activities-by-day-list.component';

describe('ActivitiesByDayListComponent', () => {
  let component: ActivitiesByDayListComponent;
  let fixture: ComponentFixture<ActivitiesByDayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitiesByDayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesByDayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
