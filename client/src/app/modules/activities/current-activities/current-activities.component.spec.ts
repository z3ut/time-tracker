import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentActivitiesComponent } from './current-activities.component';
import { ActivityService } from 'src/app/core/services/activity.service';
import { EditableActivityComponent } from '../editable-activity/editable-activity.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { HttpClientModule } from '@angular/common/http';

describe('CurrentActivitiesComponent', () => {
  let component: CurrentActivitiesComponent;
  let fixture: ComponentFixture<CurrentActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule, HttpClientModule,
        SharedModule, OwlDateTimeModule,
        OwlNativeDateTimeModule
      ],
      declarations: [CurrentActivitiesComponent, EditableActivityComponent],
      providers: [ActivityService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
