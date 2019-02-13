import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeAmountComponent } from './time-amount.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

describe('TimeAmountComponent', () => {
  let component: TimeAmountComponent;
  let fixture: ComponentFixture<TimeAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        OwlDateTimeModule,
        OwlNativeDateTimeModule
      ],
      declarations: [ TimeAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
