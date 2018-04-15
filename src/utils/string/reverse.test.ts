import 'mocha';
import { expect } from 'chai';

import reverse from './reverse';

describe('Utils.String.Reverse', () => {
  it('should reverse a string value "abc" to "cba"', () => {
    expect(reverse('abc')).to.equal('cba');
  });
});
