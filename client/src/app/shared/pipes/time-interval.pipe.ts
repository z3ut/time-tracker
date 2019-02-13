import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeInterval'
})
export class TimeIntervalPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    const totalSecondsPassed = value / 1000;
    const hours = Math.floor(totalSecondsPassed / 60 / 60);
    const minutes = Math.floor(totalSecondsPassed / 60) % 60;
    const seconds = Math.floor(totalSecondsPassed % 60);
    return `${hours}h:${minutes}m:${seconds}s`;
  }

}
