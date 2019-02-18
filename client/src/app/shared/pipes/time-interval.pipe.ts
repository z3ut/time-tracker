import { Pipe, PipeTransform } from '@angular/core';
import { SecondsToTimeFormatService } from '../services/seconds-to-time-format.service';

@Pipe({
  name: 'timeInterval'
})
export class TimeIntervalPipe implements PipeTransform {

  constructor(private secondsToTimeFormatService: SecondsToTimeFormatService) { }

  transform(value: number, args?: any): any {
    const totalSecondsPassed = value / 1000;

    return this.secondsToTimeFormatService
      .convertSecondsToTime(totalSecondsPassed);
  }

}
