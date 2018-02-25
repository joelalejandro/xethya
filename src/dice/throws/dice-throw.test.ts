import 'mocha';
import { expect } from 'chai';

import { DiceThrow } from './dice-throw';
import DiceThrowResult from './dice-throw-result';

import Range from '../../utils/range/range';

describe('DiceThrow', () => {

  describe('#constructor', () => {
    it('should instantiate correctly with the expected input', () => {
      const diceThrow = new DiceThrow({
        numberOfDices: 3,
        maxNumber: 100
      });
      expect(diceThrow.dices.length).to.equal(3);
      expect(diceThrow.dices.every(d => d.faces === 100)).to.be.true;
    });
    it('should not fail if no numberOfDices is provided', () => {
      expect(() => new DiceThrow()).to.not.throw(/expected `numberOfDices` to be a Number/);
    });
    it('should not fail if no maxNumber is provided', () => {
      expect(() => new DiceThrow({ numberOfDices: 2 })).to.not.throw(/expected `maxNumber` to be a Number/);
    });
    it('should fail if maxNumber < 2', () => {
      expect(() => new DiceThrow({ numberOfDices: 2, maxNumber: 1 })).to.throw(/expected `maxNumber` to be at least 2/);
    });
  });

  describe('#roll', () => {
    it('should return an instance of DiceThrowResult', () => {
      const diceThrow = new DiceThrow({ numberOfDices: 3, maxNumber: 100 });
      expect(diceThrow.roll()).to.be.an.instanceof(DiceThrowResult);
    });
    describe('#DiceThrowResult', () => {
      it('should contain as many rolls as dices declared', () => {
        const diceThrow = new DiceThrow({ numberOfDices: 3, maxNumber: 100 });
        expect(diceThrow.roll().rolls.length).to.equal(3);
      });
      it('should generate numbers within the dices\' range', () => {
        const diceThrow = new DiceThrow({ numberOfDices: 3, maxNumber: 100 });
        expect(diceThrow.roll().rolls.every(
          r => (Range.fromNotation('1~100') as Range).includes(r))
        ).to.be.true;
      });
      it('should hold the sum of its values', () => {
        const diceThrow = new DiceThrow({ numberOfDices: 3, maxNumber: 100 });
        const throwResult = diceThrow.roll();
        expect(throwResult.getRollSum()).to.equal(throwResult.rolls.reduce((m, n) => m + n));
      });
    });
  });

});
