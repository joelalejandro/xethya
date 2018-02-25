/**
 * The core class of the package. The Dice class allows to configure a single,
 * positive, integer random throw.
 *
 * By default, the chance throw uses the Blum Blum Shub algorithm contained in
 * `xethya-extension-random-bbs`, which provides a randomizer with an equal chance
 * of rolling numbers in all of the range.
 *
 * You can use the `xethya-extension-random-mtw` package to use the chance throw
 * with the Mersenne-Twister algorithm, which provides an average distribution
 * of 65-35-0 (you'll never get numbers larger than 66).
 *
 * @example
 * ```js
 * // Roll a single d6.
 * const d6 = new Dice();
 * d6.roll(); // A number between 1 and 6.
 *
 * // Roll a single d4.
 * const d4 = new Dice({ faces: 4 });
 * d4.roll();
 *
 * // Alternative, static syntax. Will always use Blum Blum Shub.
 * Dice.rollD(4);
 *
 * // Create a dice, roll it, then change its size.
 * const mutantDice = new Dice({ faces: 10 });
 * mutantDice.roll(); // A number between 1 and 10.
 * mutantDice.faces = 4;
 * mutantDice.roll(); // A number between 1 and 4.
 * ```
 *
 * @class Dice
 * @extends {XethyaObject}
 *
 * @param {Object} settings - A configuration object.
 * @param {Number} [settings.number = 6] - How many faces the dice has, or
 *                 the maximum number the roll can be.
 * @param {Class}  [settings.randomStrategy = BlumBlumShubAlgorithm] - The strategy to use
 *                 to generate the numbers. Must be a class that implements a `generateRandom()`
 *                 method.
 * @param {Object} [settings.randomStrategySettings = {}] - Specific configuration for the
 *                 randomizer. Most strategies should have default settings so you don't need
 *                 to use this, usually.
 *
 * @property {Number} faces - Gets or sets how many faces the dice has. Must be at least 2.
 * @property {Class} randomStrategy - Contains the reference to the pRNG used by the dice.
 * @property {Object} randomStrategySettings - Contains the pRNG's settings.
 *
 * @uses BlumBlumShubAlgorithm
 */

import Randomizer from '../random/randomizer';
import { BlumBlumShubAlgorithm } from '../random/blum-blum-shub';
import XethyaObject from '../base/object';
import IRandomAlgorithm from '../random/random-algorithm.i';
import assert from '../utils/assert/assert';
import IConstructableRandomAlgorithm from '../random/constructable-random-algorithm.i';
import IConstructable from '../utils/constructable.t';
import IRandomSettings from '../random/random-settings.i';

export interface IDiceSettings extends IRandomSettings {
  faces: number,
}

export class Dice extends XethyaObject {
  private _faces: number = 6;
  private _mustPreservePrng: boolean;
  private _randomStrategy?: IRandomAlgorithm;
  private _randomizer?: IRandomAlgorithm;
  private _randomStrategySettings?: object;

  constructor({
    faces = 6,
    randomStrategy = BlumBlumShubAlgorithm,
    randomStrategySettings = {}
  } = {} as IDiceSettings) {
    super();

    this.faces = faces;
    this.setRandomStrategy(randomStrategy as IRandomAlgorithm, randomStrategySettings);
    this._mustPreservePrng = randomStrategy.recommendsToReinstantiate();
  }

  /**
   * Reinitializes the randomizer according to the strategy's recommendation.
   *
   * @private
   * @method _regenerateRandomStrategyIfNeeded
   */
  _regenerateRandomStrategyIfNeeded() {
    if (!this._mustPreservePrng) {
      this._initializeRandomizer();
    }
  }

  /**
   * Instantiates the randomizer.
   *
   * @private
   * @method _initializeRandomizer
   */
  private _initializeRandomizer() {
    this._randomizer = new Randomizer(this.randomStrategy as IConstructableRandomAlgorithm<IRandomAlgorithm>).create(<object>this.randomStrategySettings);
  }

  roll(): number {
    this.emit('before:roll');

    const random: number = (<IRandomAlgorithm>this._randomizer).generateRandom();
    const result: number = Math.ceil(random * this.faces);
    this._regenerateRandomStrategyIfNeeded();

    this.emit('roll', result);

    return result;
  }

  /**
   * Sets a new random strategy for the dice.
   *
   * @public
   * @method
   * @param {Class}  randomStrategy - The strategy to use to generate the numbers.
   *                 Must be a class that implements a `generateRandom()` method.
   * @param {Object} [randomStrategySettings = {}] - Specific configuration for the
   *                 randomizer. Most strategies should have default settings so you don't need
   *                 to use this, usually.
   */
  setRandomStrategy(randomStrategy: IRandomAlgorithm, randomStrategySettings = {}) {
    this.randomStrategy = randomStrategy;
    this.randomStrategySettings = randomStrategySettings;

    this._initializeRandomizer();
  }

  get faces() {
    return this._faces;
  }

  /**
   * @throws {Error} if faces isn't a Number or it's less than 2.
   */
  set faces(faces) {
    assert(faces >= 2, 'Dice#setFaces: a dice must have at least two faces');

    this._faces = faces;
  }

  get randomStrategy() {
    return this._randomStrategy;
  }

  set randomStrategy(randomStrategy) {
    this._randomStrategy = randomStrategy;
  }

  get randomStrategySettings() {
    return this._randomStrategySettings;
  }

  set randomStrategySettings(randomStrategySettings) {
    this._randomStrategySettings = randomStrategySettings;
  }

  static rollD(faces: number) {
    return new Dice({ faces }).roll();
  }
}
