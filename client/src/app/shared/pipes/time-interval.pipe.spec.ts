import { TimeIntervalPipe } from './time-interval.pipe';
import { TestBed } from '@angular/core/testing';

describe('TimeIntervalPipe', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('create an instance', () => {
    const pipe: TimeIntervalPipe = TestBed.get(TimeIntervalPipe);
    expect(pipe).toBeTruthy();
  });
});
