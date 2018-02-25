import 'mocha';
import { expect } from 'chai';

import Range from './range';

describe('Utils.Range', () => {

  describe('#constructor', () => {
    it('should instantiate correctly with expected input', () => {
      const range = new Range(1, 10);
      expect(range.lowerBound).to.equal(1);
      expect(range.upperBound).to.equal(10);
    });
    it('should instantiate correctly even if lowerBound > upperBound', () => {
      const range = new Range(10, 1);
      expect(range.lowerBound).to.equal(1);
      expect(range.upperBound).to.equal(10);
    });
    it('should fail to instantiate if lowerBound === upperBound', () => {
      expect(() => new Range(1, 1)).to.throw(/lowerBound and upperBound cannot be equal/);
    });
  });

  describe('#includes', () => {
    const range = new Range(0, 1);
    it('should find a number in a range', () => {
      expect(range.includes(Math.random())).to.be.true;
      expect(range.includes(range.lowerBound)).to.be.true;
      expect(range.includes(range.upperBound)).to.be.true;
    });
    it('should not find a number not belonging to the range', () => {
      expect(range.includes(-1)).to.be.false;
      expect(range.includes(2)).to.be.false;
      expect(range.includes(Infinity)).to.be.false;
      expect(range.includes(-Infinity)).to.be.false;
    });
  });

  describe('#toString', () => {
    const range = new Range(1, 100);
    it('should provide a text representation of the range', () => {
      expect(range.toString()).to.equal('1 ~ 100');
    });
    it('should be possible to recreate the Range from its text representation', () => {
      const rebuiltRange = Range.fromNotation(range.toString()) as Range;
      expect(rebuiltRange.lowerBound).to.equal(range.lowerBound);
      expect(rebuiltRange.upperBound).to.equal(range.upperBound);
    });
  });

  describe('#fromArray', () => {
    it('should create a Range from a numeric Array', () => {
      const range = Range.fromArray([1, 100]);
      expect(range.lowerBound).to.equal(1);
      expect(range.upperBound).to.equal(100);
    });
    it('should create a Range from a numeric Array, regardless of bound order', () => {
      const range = Range.fromArray([100, 1]);
      expect(range.lowerBound).to.equal(1);
      expect(range.upperBound).to.equal(100);
    });
    it('should fail to create a Range from an Array with less or more than 2 elements', () => {
      expect(() => Range.fromArray([1])).to.throw(/must be an Array/);
      expect(() => Range.fromArray([])).to.throw(/must be an Array/);
      expect(() => Range.fromArray([1, 34, 2])).to.throw(/must be an Array/);
    });
  });

  describe('#fromNotation', () => {
    it('should instantiate correctly Range objects for every notation type', () => {
      [',', ';', ':', '~',
      ' ,', ' ;', ' :', ' ~',
      ', ', '; ', ': ', '~ ',
      ' , ', ' ; ', ' : ', ' ~ '].forEach((delimiter) => {
        const range = Range.fromNotation(`1${delimiter}10`) as Range;
        expect(range.lowerBound).to.equal(1);
        expect(range.upperBound).to.equal(10);
      });
    });
    it('should fail if an invalid delimiter is used', () => {
      expect(() => Range.fromNotation('1$50')).to.throw(/notedRange/);
    });
    it('should fail if less or more than 2 elements are found in the string', () => {
      expect(() => Range.fromNotation('1,2,3')).to.throw(/notedRange/);
    });
  });
});
