import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { SecondsToTimeFormatService } from '../../services/seconds-to-time-format.service';

@Component({
  selector: 'app-time-amount',
  templateUrl: './time-amount.component.html',
  styleUrls: ['./time-amount.component.scss']
})
export class TimeAmountComponent implements OnChanges {

  intervalString = '';
  mask = [ /\d/, /\d/, ':', /[0-5]/, /\d/, ':', /[0-5]/, /\d/ ];

  @Input() intervalSeconds: number;
  @Input() isReadonly: boolean;
  @Output() updateTime = new EventEmitter<number>();
  @Output() leaveFocus = new EventEmitter();

  constructor(private secondsToTimeFormatService: SecondsToTimeFormatService) { }

  ngOnChanges() {
    this.intervalString = this.secondsToTimeFormatService
      .convertSecondsToTime(this.intervalSeconds);
  }

  inputLeaveFocus() {
    this.leaveFocus.emit();
    this.updateTime.emit(this.secondsToTimeFormatService
      .converTimeToSeconds(this.intervalString));
  }
}
