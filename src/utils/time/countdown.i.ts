import ITimeInterval from './time-interval.i';
import TimeInterval from './time-interval';

export default interface ICountdown extends ITimeInterval {
  secondsToCount: number;
  secondsElapsed: number;
  isPaused: boolean;
  isFinished: boolean;
  beginCountdown(): void;
  pauseCountdown(): void;
  stopCountdown(): void;
}
