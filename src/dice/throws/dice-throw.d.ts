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
import IRandomSettings from '../../random/random-settings.i';
export interface IDiceThrowSettings extends IRandomSettings {
    numberOfDices?: number;
    maxNumber?: number;
}
export declare const enum DiceThrowTypes {
    FAILURE = "failure",
    SUCCESS = "success",
    CRITICAL_SUCCESS = "criticalSuccess",
}
export declare class DiceThrow {
    dices: Dice[];
    constructor({numberOfDices, maxNumber, randomStrategy, randomStrategySettings}?: IDiceThrowSettings);
    roll(): DiceThrowResult;
}
