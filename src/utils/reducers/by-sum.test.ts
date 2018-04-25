import 'mocha';
import { expect } from 'chai';

import bySum from './by-sum';

const sampleData = [1, 2, 3, 4, 5, 6];

describe('Utils.Reducers.BySum', () => {
  it('should left-reduce a numeric array by sum', () => {
    expect(sampleData.reduce(bySum)).to.equal(21);
  });
  it('should right-reduce a numeric array by sum', () => {
    expect(sampleData.reduceRight(bySum)).to.equal(21);
  });
});
