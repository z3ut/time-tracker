import { TestBed } from '@angular/core/testing';

import { SecondsToTimeFormatService } from './seconds-to-time-format.service';

describe('SecondsToTimeFormatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecondsToTimeFormatService = TestBed.get(SecondsToTimeFormatService);
    expect(service).toBeTruthy();
  });

  it('should parse time to seconds', () => {
    const service: SecondsToTimeFormatService = TestBed.get(SecondsToTimeFormatService);

    const time = '10:05:13';
    const seconds = service.converTimeToSeconds(time);
    expect(seconds).toBe(10 * 60 * 60 + 5 * 60 + 13);
  });

  it('should convert seconds to time', () => {
    const service: SecondsToTimeFormatService = TestBed.get(SecondsToTimeFormatService);

    const seconds = 10 * 60 * 60 + 5 * 60 + 13;
    const time = service.convertSecondsToTime(seconds);
    expect(time).toBe('10:05:13');
  });

  it('should return null for wrong time format', () => {
    const service: SecondsToTimeFormatService = TestBed.get(SecondsToTimeFormatService);

    expect(service.converTimeToSeconds('')).toBeNull();
    expect(service.converTimeToSeconds('42')).toBeNull();
    expect(service.converTimeToSeconds('22:98:71')).toBeNull();
    expect(service.converTimeToSeconds('wrong time')).toBeNull();
  });
});
