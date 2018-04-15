import 'mocha';
import { expect } from 'chai';

import { P, Q, DefaultSeeds, BlumBlumShubAlgorithm } from './blum-blum-shub';

const p = 246721;
const q = 137181;
const seedNumber = 248165;

describe('Random.BlumBlumShubAlgorithm', () => {

  it('should provide a RecommendsToReinstantiate method', () => {
    expect(BlumBlumShubAlgorithm.recommendsToReinstantiate).to.be.a('function');
    expect(BlumBlumShubAlgorithm.recommendsToReinstantiate()).to.be.a('boolean');
  });

  it('should recommend reinstatiation', () => {
    expect(BlumBlumShubAlgorithm.recommendsToReinstantiate()).to.be.true;
    expect(new BlumBlumShubAlgorithm().recommendsToReinstantiate()).to.be.true;
  });

  describe('#constructor', () => {

    it('should instantiate correctly with default parameters', () => {
      const bbs = new BlumBlumShubAlgorithm();
      expect(bbs.P).to.equal(P);
      expect(bbs.Q).to.equal(Q);
      expect(bbs.M).to.equal(P * Q);
      expect(bbs.seedNumber).to.be.oneOf(DefaultSeeds);
    });

    it('should instantiate correctly with P assigned', () => {
      const bbs = new BlumBlumShubAlgorithm({ p });
      expect(bbs.P).to.equal(p);
      expect(bbs.Q).to.equal(Q);
      expect(bbs.M).to.equal(p * Q);
      expect(bbs.seedNumber).to.be.oneOf(DefaultSeeds);
    });

    it('should instantiate correctly with Q assigned', () => {
      const bbs = new BlumBlumShubAlgorithm({ q });
      expect(bbs.P).to.equal(P);
      expect(bbs.Q).to.equal(q);
      expect(bbs.M).to.equal(P * q);
      expect(bbs.seedNumber).to.be.oneOf(DefaultSeeds);
    });

    it('should instantiate correctly with seedNumber assigned', () => {
      const bbs = new BlumBlumShubAlgorithm({ seedNumber });
      expect(bbs.P).to.equal(P);
      expect(bbs.Q).to.equal(Q);
      expect(bbs.M).to.equal(P * Q);
      expect(bbs.seedNumber).to.equal(seedNumber);
    });

    it('should instantiate correctly with P assigned, Q skipped and seedNumber assigned', () => {
      const bbs = new BlumBlumShubAlgorithm({ p, seedNumber });
      expect(bbs.P).to.equal(p);
      expect(bbs.Q).to.equal(Q);
      expect(bbs.M).to.equal(p * Q);
      expect(bbs.seedNumber).to.equal(seedNumber);
    });

    it('should instantiate correctly with P assigned, Q assigned and seedNumber skipped', () => {
      const bbs = new BlumBlumShubAlgorithm({ p, q });
      expect(bbs.P).to.equal(p);
      expect(bbs.Q).to.equal(q);
      expect(bbs.M).to.equal(p * q);
      expect(bbs.seedNumber).to.be.oneOf(DefaultSeeds);
    });

    it('should instantiate correctly with P, Q and seedNumber assigned', () => {
      const bbs = new BlumBlumShubAlgorithm({ p, q, seedNumber });
      expect(bbs.P).to.equal(p);
      expect(bbs.Q).to.equal(q);
      expect(bbs.M).to.equal(p * q);
      expect(bbs.seedNumber).to.equal(seedNumber);
    });

    it('should instantiate correctly with P skipped, and Q and seedNumber assigned', () => {
      const bbs = new BlumBlumShubAlgorithm({ q, seedNumber });
      expect(bbs.P).to.equal(P);
      expect(bbs.Q).to.equal(q);
      expect(bbs.M).to.equal(P * q);
      expect(bbs.seedNumber).to.equal(seedNumber);
    });

  });

  describe('#generateRandom', () => {
    it('should generate random numbers', () => {
      const bbs = new BlumBlumShubAlgorithm();
      const rolled = [];
      const distribution = { lower: 0, middle: 0, upper: 0 };
      for (let i = 0; i < 100; i += 1) {
        const randomIndex = bbs.randomIndex;
        const r = bbs.generateRandom();
        expect(r).to.be.a('Number');
        expect(r).to.equal(randomIndex * randomIndex % bbs.M / bbs.M);
        rolled.push(r);
        if (r >= 0 && r < 1 / 3) {
          distribution.lower += 1;
        } else if (r >= 1 / 3 && r < 2 / 3) {
          distribution.middle += 1;
        } else if (r > 2 / 3) {
          distribution.upper += 1;
        }
      }
      console.log('Distribution:', distribution);
    });
  });

  describe('#generateRandom', () => {
    it('should generate random integer numbers', () => {
      const bbs = new BlumBlumShubAlgorithm();
      const rolled = [];
      for (let i = 0; i < 100; i += 1) {
        const randomIndex = bbs.randomIndex;
        const r = bbs.generateRandomInteger();
        expect(r).to.be.a('Number');
        expect(r).to.equal(Number(Math.abs(randomIndex * randomIndex % bbs.M / bbs.M)
          .toString().replace(/\./, '')));
        rolled.push(r);
      }
    });
  });
});
