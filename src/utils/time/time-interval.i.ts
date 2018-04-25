import { TimeMeasurement } from "./time-interval";

export default interface ITimeInterval {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;

  as(timeUnit: TimeMeasurement): number;
  asSeconds(): number;
  asMinutes(): number;
  asHours(): number;
  asDays(): number;

  clone(): ITimeInterval;
}
