import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecondsToTimeFormatService {

  constructor() { }

  convertSecondsToTime(intervalSeconds: number): string {
    if (!intervalSeconds || intervalSeconds < 0) {
      return '00:00:00';
    }

    const hours = Math.floor(intervalSeconds / 60 / 60);
    const minutes = Math.floor((intervalSeconds - hours * 60) / 60);
    const seconds = Math.floor(intervalSeconds - hours * 60 * 60 - minutes * 60);

    const twoDigitNum: (num: number) => string =
      num => hours.toString().padStart(2, '0');

    return `${twoDigitNum(hours)}:${twoDigitNum(minutes)}:${twoDigitNum(seconds)}`;
  }

  converTimeToSeconds(time: string): number {
    if (!this.getTimeFormat().test(time)) {
      return null;
    }

    return time
      .split(':')
      .reverse()
      .map(v => +v || 0)
      .reduce((acc, cur, i) => acc + cur * Math.pow(60, i), 0);
  }

  getTimeFormat(): RegExp {
    return /\d\d:[0-5]\d:[0-5]\d/;
  }
}
