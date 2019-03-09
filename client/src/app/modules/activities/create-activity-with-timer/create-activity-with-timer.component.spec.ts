import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActivityWithTimerComponent } from './create-activity-with-timer.component';

describe('CreateActivityWithTimerComponent', () => {
  let component: CreateActivityWithTimerComponent;
  let fixture: ComponentFixture<CreateActivityWithTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateActivityWithTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActivityWithTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
