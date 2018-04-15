import TimeInterval from './time-interval';
import ICountdown from './countdown.i';
import IIndexedByString from '../collection/indexed-by-string.i';

export default class Countdown extends TimeInterval implements ICountdown {
  protected _countdownTimer: number = 0;
  protected _isPaused: boolean;
  protected _isFinished: boolean;
  protected _secondsToCount: number = 0;
  protected _secondsElapsed: number = 0;

  constructor(from: TimeInterval) {
    super(from.seconds, from.minutes, from.hours, from.days);

    this._isPaused = false;
    this._isFinished = false;
  }

  get secondsToCount() {
    return this._secondsToCount;
  }

  get secondsElapsed() {
    return this._secondsElapsed;
  }

  get isPaused() {
    return this._isPaused;
  }

  get isFinished() {
    return this._isFinished;
  }

  beginCountdown() {
    this._countdownTimer = setInterval(() => this.tick(), 1000);
    this._secondsToCount = this.asSeconds();
    this._secondsElapsed = 0;
    this.emit('timer:begin');
  }

  pauseCountdown() {
    if (this._isPaused) {
      return;
    }

    this._isPaused = true;
    clearInterval(this._countdownTimer);
  }

  resumeCountdown() {
    if (!this._isPaused) {
      return;
    }

    this._isPaused = false;
    this._countdownTimer = setInterval(() => this.tick(), 1000);
  }

  protected tick(): void {
    this._secondsElapsed += 1;
    this.emit('timer:tick', this);

    if (this._secondsElapsed >= this._secondsToCount) {
      clearInterval(this._countdownTimer);
      this.emit('timer:end');
      this._isFinished = true;
    }
  }
}
