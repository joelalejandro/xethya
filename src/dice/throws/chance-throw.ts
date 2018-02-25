/**
 * A d100 thrower. Useful for probability calculation. A throw is classified
 * with a roll score map, where the defaults are:
 *
 * - 1-20: Failure
 * - 21-90: Success
 * - 91-100: Critical success
 *
 * You can move around these ranges in order to change the roll's difficulty.
 * For instance, a very difficult throw would be one like this:
 *
 * - 1-80: Failure
 * - 81-98: Success
 * - 99-100: Critical success
 *
 * Notice that the success rate ranges cannot overlap, as the result resolver
 * won't be able to distinguish between rates otherwise.
 *
 * As ChanceThrow is an extension of Dice, it's regulated by the same randomizer
 * rules.
 *
 * @example
 * ```js
 * // Default settings.
 * const d100 = new ChanceThrow();
 * d100.roll();
 *
 * // A very difficult throw.
 * const d100Hard = new ChanceThrow({
 *   rollScores: {
 *     failure: new Range(1, 80),
 *     success: new Range(81, 98),
 *     criticalSuccess: new Range(99, 100),
 *   }
 * });
 * d100Hard.roll();
 *
 * // A chance throw of d66. Useful for capping the success rate
 * // without changing the roll scores map.
 * import { MersenneTwisterAlgorithm } from 'xethya-extension-random-mtw';
 *
 * const d66 = new ChanceThrow({
 *   randomStrategy: MersenneTwisterAlgorithm,
 * });
 * d66.roll();
 * ```
 *
 * @class ChanceThrow
 * @extends DiceThrow
 *
 * @param {Object} [settings] - Configuration object for the throw.
 * @param {Object} [settings.rollScores] - A map of ranges to determine the success rate of
 *                 the chance throw's result.
 * @param {Range}  [settings.rollScores.failure = new Range(1, 20)] - A Range to describe a
 *                 failed throw. This range can be used to apply penalizations to the player.
 * @param {Range}  [settings.rollScores.success = new Range(21, 90)] - A Range to describe a
 *                 success throw. This range can be used to give the player a reward.
 * @param {Range}  [settings.rollScores.criticalSuccess = new Range(91, 100)] - A Range to
 *                 describe a critical success throw. This result means the throw went even
 *                 better than normal, so a major reward can be given.
 * @param {Class}  [settings.randomStrategy = BlumBlumShubAlgorithm] - The strategy to use
 *                 to generate the numbers. Must be a class that implements a `generateRandom()`
 *                 method.
 *
 * @see https://github.com/xethya/xethya-extension-random-bbs/wiki/Blum-Blum-Shub-distributions
 * @see https://github.com/xethya/xethya-extension-random-mtw
 *
 * @uses Range
 * @uses BlumBlumShubAlgorithm
 * @uses ChanceThrowResult
 */

import Range from '../../utils/range/range';
import { BlumBlumShubAlgorithm } from '../../random/blum-blum-shub';

import { DiceThrow, IDiceThrowSettings, DiceThrowTypes } from './dice-throw';
import ChanceThrowResult from './chance-throw-result';
import IConstructableRandomAlgorithm from '../../random/constructable-random-algorithm.i';
import IRandomSettings from '../../random/random-settings.i';
import IRollScoreSettings from './roll-score-settings.i';
import assert from '../../utils/assert/assert';

export interface IChanceThrowSettings extends IDiceThrowSettings {
  rollScores: IRollScoreSettings,
}

export class ChanceThrow extends DiceThrow {
  settings: IChanceThrowSettings;

  constructor(settings = { randomStrategy: undefined } as IChanceThrowSettings) {
    super({
      numberOfDices: 1,
      maxNumber: 100,
      randomStrategy: settings.randomStrategy || BlumBlumShubAlgorithm as IConstructableRandomAlgorithm<BlumBlumShubAlgorithm>,
      randomStrategySettings: {
        seedNumber: Number(Math.random().toString().replace(/\./, ''))
      }
    });

    const defaults = {
      rollScores: {
        failure: new Range(1, 20),
        success: new Range(21, 90),
        criticalSuccess: new Range(91, 100)
      }
    };

    this.settings = <IChanceThrowSettings>Object.assign({}, settings, defaults);
  }

  /**
   * Returns the range for a success rate.
   *
   * @private
   * @function
   * @param {string} key - The success rate to lookup.
   * @return {Range}
   */
  private _range(key: string) {
    return this.settings.rollScores[key];
  }

  /**
   * Determines the success rate of the throw.
   *
   * @private
   * @function
   * @param {Number} rollSum - The results of the throw.
   * @return {String}
   */
  private _calculateThrowType(rollSum: number): DiceThrowTypes | undefined {
    for (let throwType of Object.keys(this.settings.rollScores)) {
      if (this._range(throwType).includes(rollSum)) {
        return throwType as DiceThrowTypes;
      }
    }
  }

  /**
   * Rolls the dice.
   *
   * @public
   * @function roll
   * @override
   */
  roll() {
    const diceThrow = super.roll();
    const ctr = new ChanceThrowResult(diceThrow);
    const rollSum = diceThrow.getRollSum();

    ctr.throwType = this._calculateThrowType(rollSum);

    return ctr;
  }
}
