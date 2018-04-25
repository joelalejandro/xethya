import 'mocha';
import sinon from 'sinon';
import chai from 'chai';

import spies from 'chai-spies';

chai.use(spies);
const { expect } = chai;

import Countdown from './countdown';
import TimeInterval from './time-interval';

let countdown: Countdown;
let clock = sinon.useFakeTimers();

describe('Utils.Time.Countdown', () => {
  beforeEach(() => {
    countdown = new Countdown(new TimeInterval(0, 1));
  });
  it('should instantiate with the expected input', () => {
    expect(countdown.seconds).to.equal(0);
    expect(countdown.minutes).to.equal(1);
    expect(countdown.isPaused).to.be.false;
    expect(countdown.isFinished).to.be.false;
  });
  describe('#beginCountdown (1 minute)', () => {
    it('should set secondsToCount to 60', () => {
      countdown.beginCountdown();
      expect(countdown.secondsToCount).to.equal(60);
    });
    it('should set secondsElapsed to 0', () => {
      countdown.beginCountdown();
      expect(countdown.secondsElapsed).to.equal(0);
    });
    it('should trigger the `timer:begin` event', (done) => {
      countdown.once('timer:begin', () => {
        done();
      });

      countdown.beginCountdown();
    });
  });
  describe('#tick', () => {
    beforeEach(() => {
      countdown.beginCountdown();
    });
    it('should increment secondsElapsed', () => {
      clock.tick(1000);
      expect(countdown.secondsElapsed).to.equal(1);
    });
    it('should keep incrementing secondsElapsed', () => {
      clock.tick(30000);
      expect(countdown.secondsElapsed).to.equal(30);
    });
    it('should trigger the `timer:tick` event', (done) => {
      countdown.once('timer:tick', (timer: Countdown) => {
        expect(timer.secondsElapsed).to.equal(1);
        expect(timer.secondsElapsed).to.equal(countdown.secondsElapsed);
        done();
      });
      clock.tick(1000);
    });
    it('should trigger the `timer:end` event when time is up', (done) => {
      countdown.once('timer:end', () => {
        done();
      });
      clock.tick(60000);
    });
    it('should set isFinished to true when time is up', () => {
      clock.tick(60000);
      expect(countdown.isFinished, 'did not set isFinished: ' + JSON.stringify(countdown)).to.be.true;
    });
  });
  describe('#pauseCountdown', () => {
    beforeEach(() => {
      countdown.beginCountdown();
      clock.tick(10000);
    });
    it('should mark the countdown as paused', () => {
      countdown.pauseCountdown();
      expect(countdown.isPaused).to.be.true;
    });
    it('should not increment secondsElapsed while paused', () => {
      countdown.pauseCountdown();
      const { secondsElapsed } = countdown;
      clock.tick(10000);
      expect(countdown.secondsElapsed).to.equal(secondsElapsed);
    });
    it('should not re-pause if countdown was already paused', () => {
      const spyClearInterval = chai.spy(clearInterval);
      countdown.pauseCountdown();
      clock.tick(5000);
      countdown.pauseCountdown();
      expect(spyClearInterval).to.not.have.been.called;
    });
  });
  describe('#resumeCountdown', () => {
    beforeEach(() => {
      countdown.beginCountdown();
      clock.tick(10000);
    });
    it('should do nothing if the countdown is ticking', () => {
      const spySetInterval = chai.spy(setInterval);
      countdown.resumeCountdown();
      expect(spySetInterval).to.not.have.been.called;
    });
    it('should mark the countdown as not paused', () => {
      countdown.pauseCountdown();
      expect(countdown.isPaused).to.be.true;
      countdown.resumeCountdown();
      expect(countdown.isPaused).to.be.false;
    });
    it('should restart ticking after resuming', (done) => {
      countdown.pauseCountdown();
      countdown.once('timer:tick', () => {
        done();
      });
      countdown.resumeCountdown();
      clock.tick(1000);
    });
  });
  after(() => {
    clock.restore();
  });
});
