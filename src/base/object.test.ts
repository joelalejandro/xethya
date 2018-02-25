import 'mocha';
import { expect } from 'chai';

import XethyaObject from './object';
import { EventEmitter } from 'eventemitter3';

class MyObject extends XethyaObject {
  constructor() {
    super();
  }
}

describe('Base.XethyaObject', () => {
  it('should contain EventEmitter prototype', () => {
    const obj: MyObject = new MyObject();
    expect(obj.on).to.equal(EventEmitter.prototype.on);
  });
});
