import 'mocha';
import chai from 'chai';
import spies from 'chai-spies';

const { expect } = chai;

chai.use(spies);

import { MersenneTwisterAlgorithm, M, N } from './mersenne-twister';

describe('Random.MersenneTwister', () => {

  it('should contain a recommendsToReinstantiate static method with a boolean return type', () => {
    expect(MersenneTwisterAlgorithm.recommendsToReinstantiate).to.be.a('function');
    expect(MersenneTwisterAlgorithm.recommendsToReinstantiate()).to.be.a('boolean');
  });

  it('should not recommend reinstatiation', () => {
    expect(MersenneTwisterAlgorithm.recommendsToReinstantiate()).to.be.false;
    expect(new MersenneTwisterAlgorithm().recommendsToReinstantiate()).to.be.false;
  });

  it('should initialize correctly with either method', () => {
    const mt = new MersenneTwisterAlgorithm();

    expect(mt.MT).to.satisfy((arr: number[]) => arr.every(num => !isNaN(num)));
    expect(mt.MTI).to.not.equal(0);

    mt.initializeByArray([15, 17, 3, 58]);
    expect(mt.MT[0]).to.equal(0x80000000);
  });

  it('should initialize correctly with either method, '
    + 'with an explicitly-set undefined value', () => {
    const mt = new MersenneTwisterAlgorithm({
      seedNumber: undefined,
    });

    expect(mt.MT).to.satisfy((arr: number[]) => arr.every(num => !isNaN(num)));
    expect(mt.MTI).to.not.equal(0);

    mt.initializeByArray([15, 17, 3, 58]);
    expect(mt.MT[0]).to.equal(0x80000000);
  });

  it('should trim the init vector to N if it has more values than N', () => {
    const mt = new MersenneTwisterAlgorithm();
    const numbers: number[] = [];

    for (let i: number = 0; i <= N + 10; i += 1) {
      numbers.push(i + 1);
    }

    mt.initializeByArray(numbers);
    expect(mt.MT[0]).to.equal(0x80000000);
  });

  it('should initialize correctly with a positive seed', () => {
    const mt = new MersenneTwisterAlgorithm({ seedNumber: Math.abs(Math.floor(Math.random() * 10000)) });
    expect(mt.MT).to.satisfy((arr: number[]) => arr.every(num => !isNaN(num)));
    expect(mt.MTI).to.not.equal(0);
  });

  it('should initialize correctly with a negative seed (it becomes Math.abs()\'ed)', () => {
    const mt = new MersenneTwisterAlgorithm({ seedNumber: -Math.abs(Math.floor(Math.random() * 10000)) });
    expect(mt.MT).to.satisfy((arr: number[]) => arr.every(num => !isNaN(num)));
    expect(mt.MTI).to.not.equal(0);
  });

  it('should fail to initialize correctly with an empty list', () => {
    const mt = new MersenneTwisterAlgorithm();
    expect(() => mt.initializeByArray([])).to.throw(/initKeyArray/);
  });

  it('should allow to reinitialize the generator at any given time without '
    + 'reinstantiating, with a positive seed', () => {
    const mt = new MersenneTwisterAlgorithm();
    expect(mt.MT).to.satisfy((arr: number[]) => arr.every(num => !isNaN(num)));
    expect(mt.MTI).to.not.equal(0);
    const newSeed = Math.abs(Math.floor(Math.random() * 10000));
    mt.initializeRandomGenerator(newSeed);
    expect(mt.MT[0]).to.equal(newSeed >> 0);
  });

  it('should allow to reinitialize the generator at any given time without '
    + 'reinstantiating, with a negative seed', () => {
    const mt = new MersenneTwisterAlgorithm();
    expect(mt.MT).to.satisfy((arr: number[]) => arr.every(num => !isNaN(num)));
    expect(mt.MTI).to.not.equal(0);
    const newSeed = -Math.abs(Math.floor(Math.random() * 10000));
    mt.initializeRandomGenerator(newSeed);
    expect(mt.MT[0]).to.equal(Math.abs(newSeed) >> 0);
  });

  it('should generate a value with return type Number', () => {
    const mt = new MersenneTwisterAlgorithm();
    expect(mt.generateRandomInteger()).to.be.a('number');
    expect(mt.generateRandomInteger31()).to.be.a('number');
    expect(mt.generateRandomReal53BitResolution()).to.be.a('number');
    expect(mt.generateRandomReal()).to.be.a('number');
    expect(mt.generateRandomReal3()).to.be.a('number');
    expect(mt.generateRandom()).to.be.a('number');
  });

  it('should reinitialize the generator with the 5489 magic seed if MTI = N + 1', () => {
    const mt = new MersenneTwisterAlgorithm();
    const spy = chai.spy.on(mt, 'initializeRandomGenerator');

    mt.MTI = 625;
    mt.generateRandomInteger();

    expect(spy).to.have.been.called.with(5489);
  });

  it('should generate non-negative numbers', () => {
    const mt = new MersenneTwisterAlgorithm();
    expect(mt.generateRandomInteger31()).to.be.at.least(0);
    expect(mt.generateRandomReal()).to.be.at.least(0);
    expect(mt.generateRandom()).to.be.at.least(0);
    expect(mt.generateRandomReal3()).to.be.at.least(0);
    expect(mt.generateRandomReal53BitResolution()).to.be.at.least(0);
  });

  it('should generate random numbers between 0 and 1', () => {
    const mt = new MersenneTwisterAlgorithm();
    expect(mt.generateRandomReal()).to.be.within(0, 1);
    expect(mt.generateRandom()).to.be.within(0, 1);
    expect(mt.generateRandomReal3()).to.be.within(0, 1);
  });

  it('testing distribution for generateRandom', () => {
    const mt = new MersenneTwisterAlgorithm();
    const rolled = [];
    const distribution = { lower: 0, middle: 0, upper: 0 };
    for (let i = 0; i < 100; i += 1) {
      const r = mt.generateRandom();
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

  it('testing distribution for generateRandomReal', () => {
    const mt = new MersenneTwisterAlgorithm();
    const rolled = [];
    const distribution = { lower: 0, middle: 0, upper: 0 };
    for (let i = 0; i < 100; i += 1) {
      const r = mt.generateRandomReal();
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

  it('testing distribution for generateRandomReal3', () => {
    const mt = new MersenneTwisterAlgorithm();
    const rolled = [];
    const distribution = { lower: 0, middle: 0, upper: 0 };
    for (let i = 0; i < 100; i += 1) {
      const r = mt.generateRandomReal3();
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
