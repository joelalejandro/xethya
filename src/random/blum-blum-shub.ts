/**
 * Default constant value for setting up the BBS PRNG.
 * P must be a prime number.
 *
 * @public
 * @type {Number}
 * @const P
 * @static
 */
export const P: number = 87566873;

/**
 * Default constant value for setting up the BBS PRNG.
 * Q must be a prime number.
 *
 * @public
 * @const Q
 * @static
 * @type {Number}
 */
export const Q: number = 5631179;

/**
 * A list of default seed values, tested to be evenly distributed.

 * @public
 * @const DefaultSeeds
 * @static
 * @type {Array.<Number>}
 * @see  http://wiki.fib.upc.es/sim/index.php/Blum_Blum_Shub#Tests
 */
export const DefaultSeeds: number[] = [193945, 740191, 191];

export type BlumBlumShubAlgorithmSettings = {
  p?: number,
  q?: number,
  seedNumber?: number,
};

/**
 * Instantiates a Blum Blum Shub PRNG.
 *
 * @public
 * @class BlumBlumShubAlgorithm
 */
export class BlumBlumShubAlgorithm {
  settings: BlumBlumShubAlgorithmSettings;
  seedNumber: number;
  M: number;
  P: number;
  Q: number;
  randomIndex: number;

  /**
   * Initializes the generator.
   *
   * @param  {Number} p    A prime value (defaults to P).
   * @param  {Number} q    A prime value (defaults to Q).
   * @param  {Number} seedNumber A seed number to feed the generator (defaults to any value
   *                       in DefaultSeeds).
   * @constructor
   */
  constructor(settings?: BlumBlumShubAlgorithmSettings) {
    const defaults = {
      p: P,
      q: Q,
      seedNumber: null,
    };

    this.settings = Object.assign({}, defaults, settings);

    let seedNumber: number = this.settings.seedNumber as number;
    const p = this.settings.p as number;
    const q = this.settings.q as number;

    if (seedNumber) {
      seedNumber = Math.abs(seedNumber);
    } else {
      seedNumber = DefaultSeeds[Math.floor(Math.random() * (DefaultSeeds.length))];
    }

    this.seedNumber = seedNumber;
    this.randomIndex = seedNumber;
    this.M = p * q;
    this.P = p;
    this.Q = q;
  }

  /**
   * Determines if the generator works better by being reinstantiated after
   * every generated number.
   *
   * @public
   * @static
   * @function recommendsToReinstantiate
   * @memberof BlumBlumShubAlgorithm
   * @return {Boolean}
   */
  static recommendsToReinstantiate() {
    return false;
  }

  /**
   * Generates a pseudo-random number and updates the seed for a next roll.
   * Number is always between 0 and 1.
   *
   * @public
   * @function generateRandom
   * @memberof BlumBlumShubAlgorithm
   * @instance
   * @return {Number}
   */
  generateRandom() {
    const r = this.randomIndex * this.randomIndex % this.M;
    this.randomIndex = r;
    return Math.abs(r / this.M);
  }

  /**
   * Same as `generateRandom()`, but converts the number to an Integer.
   *
   * @public
   * @function generateRandomInteger
   * @memberof BlumBlumShubAlgorithm
   * @instance
   * @return {Number}
   */
  generateRandomInteger() {
    return Number(this.generateRandom().toString().replace(/\./, ''));
  }
}
