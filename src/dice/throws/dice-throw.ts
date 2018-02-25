/**
 * xethya-dice
 *
 * Copyright © 2016 Joel A. Villarreal Bertoldi. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import { Dice } from '../dice';
import DiceThrowResult from './dice-throw-result';

import { BlumBlumShubAlgorithm } from '../../random/blum-blum-shub';
import assert from '../../utils/assert/assert';
import IRandomSettings from '../../random/random-settings.i';
import IRandomAlgorithm from '../../random/random-algorithm.i';
import IConstructableRandomAlgorithm from '../../random/constructable-random-algorithm.i';

export interface IDiceThrowSettings extends IRandomSettings {
  numberOfDices?: number,
  maxNumber?: number,
}

export const enum DiceThrowTypes {
  FAILURE = 'failure',
  SUCCESS = 'success',
  CRITICAL_SUCCESS = 'criticalSuccess',
};

export class DiceThrow {
  dices: Dice[];

  constructor({
    numberOfDices = 2,
    maxNumber = 6,
    randomStrategy = BlumBlumShubAlgorithm,
    randomStrategySettings = {}
  } = {} as IDiceThrowSettings) {
    assert(maxNumber >= 2, 'DiceThrow#constructor: expected `maxNumber` to be at least 2.');

    this.dices = [];

    for (let d = 0; d < numberOfDices; d += 1) {
      this.dices.push(new Dice({
        faces: maxNumber,
        randomStrategy: randomStrategy as IConstructableRandomAlgorithm<IRandomAlgorithm>,
        randomStrategySettings
      }));
    }
  }

  roll() {
    let dtr = new DiceThrowResult();
    dtr.rolls = this.dices.map(d => d.roll());
    return dtr;
  }
}
