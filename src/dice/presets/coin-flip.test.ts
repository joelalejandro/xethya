import 'mocha';
import { expect } from 'chai';

import { CoinFlip } from './coin-flip';
import Range from '../../utils/range/range';

describe('CoinFlip', () => {

  describe('#constructor', () => {
    it('should instantiate a CoinFlip with the expected input', () => {
      const dice = new CoinFlip();
      expect(dice.faces).to.equal(2);
      expect(dice).to.be.an.instanceOf(CoinFlip);
    });
  });

  describe('#roll', () => {
    it('should roll either 1 or 2', () => {
      [10, 20, 30].forEach(upper => {
        const range = new Range(1, 2);
        const rolled = [];
        console.log('testing range ' + range.toString());
        const dice = new CoinFlip();
        for (let _ = 0; _ < upper; _ += 1) {
          const roll = dice.roll();
          expect(range.includes(roll)).to.be.true;
          rolled.push(roll);
        }
        console.log('-- rolled: ' + rolled.join(', '));
        console.log('-- distribution: 1 = ' + rolled.filter(r => r === 1).length
          + ', 2 = ' + rolled.filter(r => r === 2).length);
      });
    });
  });
});
