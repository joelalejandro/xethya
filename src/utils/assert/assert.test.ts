import 'mocha';
import { expect } from 'chai';

import assert from './assert';
import AssertionError from './assertion-error';

describe('Base.assert', () => {
  it('should run silent if condition is true', () => {
    expect(() => {
      assert(true, 'Should not see me')
    }).to.not.throw(/Should not see me/);
  });
  it('should throw an AssertionError with the message if condition is false', () => {
    try {
      assert(false, 'Should see me');
    } catch (error) {
      const exception: AssertionError = error as AssertionError;
      expect(exception.message).to.contain('Should see me');
    }
  });
});