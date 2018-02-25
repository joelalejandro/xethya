import 'mocha';
import { expect } from 'chai';

import { ChanceThrow } from './chance-throw';
import { DiceThrowTypes } from './dice-throw';
import ChanceThrowResult from './chance-throw-result';
import Range from '../../utils/range/range';

describe('ChanceThrow', () => {

  describe('#constructor', () => {
    it('should instantiate correctly with the expected input', () => {
      const chanceThrow = new ChanceThrow();
      expect(chanceThrow.dices.length).to.equal(1);
      expect(chanceThrow.dices[0].faces).to.equal(100);
      expect(chanceThrow.settings.rollScores).to.not.be.undefined;
    });
    it('should instantiate correctly when customizing rollScores\' ranges', () => {
      const chanceThrow = new ChanceThrow({
        rollScores: {
          failure: new Range(1, 80),
          success: new Range(81, 90),
          criticalSuccess: new Range(91, 100)
        }
      });
      expect(chanceThrow.dices.length).to.equal(1);
      expect(chanceThrow.dices[0].faces).to.equal(100);
      expect(chanceThrow.settings.rollScores).to.not.be.undefined;
    });
  });

  describe('#roll', () => {
    it('should return an instance of ChanceThrowResult', () => {
      const chanceThrow = new ChanceThrow();
      expect(chanceThrow.roll()).to.be.an.instanceof(ChanceThrowResult);
    });
    it('should return a single roll between 1 and 100 (trying 100 throws)', () => {
      const chanceThrow = new ChanceThrow();
      const distribution = { failure: 0, success: 0, criticalSuccess: 0 };
      const rolled = [];
      for (let i = 0; i < 100; i++) {
        const result = chanceThrow.roll();
        expect(result.rolls.length).to.equal(1);
        expect(result.rolls[0]).to.be.within(1, 100);
        expect(result.getRollSum()).to.be.within(1, 100);
        expect(result.throwType).to.satisfy(
          (tt: string) => chanceThrow.settings.rollScores[tt] !== undefined);
        rolled.push(result.rolls[0]);
        distribution[result.throwType as DiceThrowTypes] += 1;
      }
      console.log('- -- distribution: ', JSON.stringify(distribution));
    });
  });
});
