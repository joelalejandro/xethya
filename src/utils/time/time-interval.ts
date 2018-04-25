import ITimeInterval from './time-interval.i';
import XethyaObject from '../../base/object';
import surplus from '../numeric/surplus';

export const enum TimeMeasurement {
  SECONDS = 'seconds',
  MINUTES = 'minutes',
  HOURS = 'hours',
  DAYS = 'days',
}

export default class TimeInterval extends XethyaObject implements ITimeInterval {
  protected _seconds: number = 0;
  protected _minutes: number = 0;
  protected _hours: number = 0;
  protected _days: number = 0;

  constructor(
    seconds: number = 0,
    minutes: number = 0,
    hours: number = 0,
    days: number = 0,
  ) {
    super();

    this.seconds += seconds;
    this.minutes += minutes;
    this.hours += hours;
    this.days += days;
  }

  get seconds() {
    return this._seconds;
  }

  set seconds(newValue) {
    let { remainder, surplusCount } = surplus(newValue, 60);

    this._seconds = remainder;
    this.minutes += surplusCount;
  }

  get minutes() {
    return this._minutes;
  }

  set minutes(newValue) {
    const { remainder, surplusCount } = surplus(newValue, 60);

    if (remainder > 0 && remainder < 1) {
      this.seconds += remainder * 60;
      this._minutes = 0;
      return;
    }

    this._minutes = remainder;
    this.hours += surplusCount;
  }

  get hours() {
    return this._hours;
  }

  set hours(newValue) {
    const { remainder, surplusCount } = surplus(newValue, 24);

    if (remainder > 0 && remainder < 1) {
      this.minutes += remainder * 60;
      this._hours = 0;
      return;
    }

    this._hours = remainder;
    this.days += surplusCount;
  }

  get days() {
    return this._days;
  }

  set days(newValue) {
    if (newValue > 0 && newValue < 1) {
      this.hours += newValue * 24;
      this._days = 0;
      return;
    }

    this._days = newValue;
  }

  as(timeUnit: TimeMeasurement): number {
    const callbackMap = {
      [TimeMeasurement.SECONDS]: this.asSeconds,
      [TimeMeasurement.MINUTES]: this.asMinutes,
      [TimeMeasurement.HOURS]: this.asHours,
      [TimeMeasurement.DAYS]: this.asDays,
    };

    return callbackMap[timeUnit].bind(this)();
  }

  asSeconds(): number {
    const minutesAsSeconds = this.minutes * 60;
    const hoursAsSeconds = this.hours * 60 * 60;
    const daysAsSeconds = this.days * 24 * 60 * 60;

    return this.seconds + minutesAsSeconds + hoursAsSeconds + daysAsSeconds;
  }

  asMinutes(): number {
    const secondsAsMinutes = this.seconds / 60;
    const hoursAsMinutes = this.hours * 60;
    const daysAsMinutes = this.days * 24 * 60;

    return secondsAsMinutes + this.minutes + hoursAsMinutes + daysAsMinutes;
  }

  asHours(): number {
    const secondsAsHours = this.seconds / 60 / 60;
    const minutesAsHours = this.minutes / 60;
    const daysAsHours = this.days * 24;

    return secondsAsHours + minutesAsHours + this.hours + daysAsHours;
  }

  asDays(): number {
    const secondsAsDays = this.seconds / 60 / 60 / 24;
    const minutesAsDays = this.minutes / 60 / 60;
    const hoursAsDays = this.hours / 24;

    return secondsAsDays + minutesAsDays + hoursAsDays + this.days;
  }

  clone(): TimeInterval {
    return new TimeInterval(this.seconds, this.minutes, this.hours, this.days);
  }
}
