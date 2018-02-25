import 'mocha';
import { expect } from 'chai';

import { Dice } from './dice';
import Range from '../utils/range/range';
import { MersenneTwisterAlgorithm } from '../random/mersenne-twister';
import IConstructableRandomAlgorithm from '../random/constructable-random-algorithm.i';

describe('Dice', () => {
  describe('#constructor', () => {
    it('should instantiate a Dice with the expected input', () => {
      const dice = new Dice({ faces: 2 });
      expect(dice.faces).to.equal(2);
    });
    it('should fail if a single-faced Dice is attempted', () => {
      expect(() => new Dice({ faces: 1 })).to.throw(/at least two faces/);
    });
  });

  describe('#roll', () => {
    it('should roll numbers between 1 and a given number of faces', () => {
      [10, 100, 1000].forEach(upper => {
        const range = new Range(1, upper);
        const rolled = [];
        console.log('testing range ' + range.toString());
        const dice = new Dice({ faces: range.upperBound });
        for (let _ = 0; _ < 10; _ += 1) {
          const roll = dice.roll();
          expect(range.includes(roll)).to.be.true;
          rolled.push(roll);
        }
        console.log('-- rolled: ' + rolled.join(', '));
        console.log('-- max: ' + Math.max.apply(null, rolled));
        const stepRate = upper / 5;
        let distribution = '';
        for (let block = 1; block <= upper; block += stepRate) {
          distribution += (block + '-' + (block + stepRate - 1) + ': ' + (100 * (rolled.filter(r => r >= block && r <= block + stepRate - 1)).length / rolled.length) + '%; ');
        }
        console.log('-- distribution: ' + distribution);
      });
    });
  });

  describe('#rollD', () => {
    it('should roll dices with the rollD method', () => {
      expect(Dice.rollD(6)).to.satisfy((value: number) => 1 <= value && value <= 6);
    });    
  });

  describe('#setRandomStrategy', () => {
    it('should accept a different algorithm (MTW)', () => {
      const dice = new Dice({
        faces: 6,
        randomStrategy: MersenneTwisterAlgorithm as IConstructableRandomAlgorithm<MersenneTwisterAlgorithm>,
      });
      expect(dice.roll()).to.satisfy((value: number) => 1 <= value && value <= 6);
    });
    it('should allow to change the algorithm', () => {
      const dice = new Dice({ faces: 6 });
      dice.setRandomStrategy(MersenneTwisterAlgorithm as IConstructableRandomAlgorithm<MersenneTwisterAlgorithm>);
      expect(dice.roll()).to.satisfy((value: number) => 1 <= value && value <= 6);
    });
  });

  describe('#set faces', () => {
    it('should allow to change the number of faces', () => {
      const dice = new Dice({ faces: 3 });
      dice.faces = 6;
      expect(dice.roll()).to.satisfy((value: number) => 1 <= value && value <= 6);
    }); 
    it('should fail if trying to create a 1-sided dice', () => {
      const dice = new Dice({ faces: 3 });
      expect(() => {
        dice.faces = 1;
      }).to.throw(/at least two faces/);
    });
  })
});
