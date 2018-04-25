import 'mocha';
import { expect } from 'chai';

import TimeInterval, { TimeMeasurement } from './time-interval';

const veryTinyPeriod = new TimeInterval(10);
const shortPeriod = new TimeInterval(30, 1);
const waitPeriod = new TimeInterval(0, 30, 1);
const longPeriod = new TimeInterval(0, 0, 12, 1);

describe('Utils.Time.TimeInterval', () => {
  it('should instantiate with the expected input', () => {
    expect(new TimeInterval().asSeconds()).to.equal(0);

    expect(veryTinyPeriod.seconds).to.equal(10);
    expect(veryTinyPeriod.minutes).to.equal(0);
    expect(veryTinyPeriod.hours).to.equal(0);
    expect(veryTinyPeriod.days).to.equal(0);

    expect(shortPeriod.seconds).to.equal(30);
    expect(shortPeriod.minutes).to.equal(1);
    expect(shortPeriod.hours).to.equal(0);
    expect(shortPeriod.days).to.equal(0);

    expect(waitPeriod.seconds).to.equal(0);
    expect(waitPeriod.minutes).to.equal(30);
    expect(waitPeriod.hours).to.equal(1);
    expect(waitPeriod.days).to.equal(0);

    expect(longPeriod.seconds).to.equal(0);
    expect(longPeriod.minutes).to.equal(0);
    expect(longPeriod.hours).to.equal(12);
    expect(longPeriod.days).to.equal(1);
  });
  it('should rescale time units automatically', () => {
    expect(new TimeInterval(120).minutes).to.equal(2);
    expect(new TimeInterval(0, 0.5).seconds).to.equal(30);
    expect(new TimeInterval(0, 0, 0.5).minutes).to.equal(30);
    expect(new TimeInterval(0, 0, 0, 0.25).hours).to.equal(6);
    expect(new TimeInterval(0, 90)).to.satisfy((time: TimeInterval) => time.minutes === 30 && time.hours === 1);
    expect(new TimeInterval(0, 60, 26)).to.satisfy((time: TimeInterval) => time.hours === 3 && time.days === 1);
    expect(new TimeInterval(0, 0, 25, 1)).to.satisfy((time: TimeInterval) => time.hours === 1 && time.days === 2);
  });
  it('should convert time to days', () => {
    const interval = new TimeInterval(0, 0, 12);
    expect(interval.asDays()).to.equal(0.5);
    expect(interval.as(TimeMeasurement.DAYS)).to.equal(0.5);
  });
  it('should convert time to hours', () => {
    const interval = new TimeInterval(0, 45);
    expect(interval.asHours()).to.equal(0.75);
    expect(interval.as(TimeMeasurement.HOURS)).to.equal(0.75);
  });
  it('should convert time to minutes', () => {
    const interval = new TimeInterval(15);
    expect(interval.asMinutes()).to.equal(0.25);
    expect(interval.as(TimeMeasurement.MINUTES)).to.equal(0.25);
  });
  it('should convert time to seconds', () => {
    const interval = new TimeInterval(30, 6);
    expect(interval.asSeconds()).to.equal(390);
    expect(interval.as(TimeMeasurement.SECONDS)).to.equal(390);
  });
  it('should clone the interval', () => {
    expect(veryTinyPeriod.clone()).to.deep.equal(veryTinyPeriod);
    expect(shortPeriod.clone()).to.deep.equal(shortPeriod);
    expect(waitPeriod.clone()).to.deep.equal(waitPeriod);
    expect(longPeriod.clone()).to.deep.equal(longPeriod);
  });
});
