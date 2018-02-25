import 'mocha';
import { expect } from 'chai';

import Eventable from './eventable';
import { ListenerFn } from 'eventemitter3';

class WithEvents extends Eventable {
  constructor(onEvent: ListenerFn) {
    super();
    this.on('event', onEvent);
  }

  doSomething() {
    return true;
  }
}

describe('#Eventable', () => {
  it('should trigger events', (done) => {
    const onEventDone = () => {
      done();
    };

    const withEvents = new WithEvents(onEventDone);

    withEvents.emit('event');
  });
  it('should preserve the class prototype', () => {
    const onEventDone = () => {};

    const withEvents = new WithEvents(onEventDone);

    expect(withEvents.doSomething()).to.be.true;
  });
});
