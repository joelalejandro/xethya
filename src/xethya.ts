import Eventable from './base/eventable';
import XethyaObject from './base/object';

// ----------------------------------------------------------------------------

/**
 * @package Base
 */
export {
  Eventable,
  XethyaObject,
};

// ----------------------------------------------------------------------------

/**
 * @package Utils
 */
import assert from './utils/assert/assert';
import Range from './utils/range/range';
import IRangeable from './utils/range/rangeable.i';
import Constructable from './utils/constructable.t';

export {
  assert,
  Range,
  IRangeable,
  Constructable,
} 

// ----------------------------------------------------------------------------

/**
 * @package Random
 */ 

import * as BlumBlumShub from './random/blum-blum-shub';
import * as MersenneTwister from './random/mersenne-twister';
import IConstructableRandomAlgorithm from './random/constructable-random-algorithm.i';
import IRandomAlgorithm from './random/random-algorithm.i';
import IRandomSettings from './random/random-settings.i';
import Randomizer from './random/randomizer';

export {
  BlumBlumShub,
  MersenneTwister,

  Randomizer,
  IRandomAlgorithm,
  IRandomSettings,
  IConstructableRandomAlgorithm,
};

// ----------------------------------------------------------------------------

/**
 * @package Dice
 */

import { Dice, IDiceSettings } from './dice/dice';

import { IDiceThrowSettings, DiceThrowTypes, DiceThrow } from './dice/throws/dice-throw';
import DiceThrowResult from './dice/throws/dice-throw-result';
import { IChanceThrowSettings, ChanceThrow } from './dice/throws/chance-throw';
import ChanceThrowResult from './dice/throws/chance-throw-result';
import IRollScoreSettings from './dice/throws/roll-score-settings.i';

import { CoinFlip, CoinFlipSides } from './dice/presets/coin-flip';

export {
  Dice,
  IDiceSettings,

  IDiceThrowSettings,
  DiceThrowTypes,
  DiceThrow,
  IChanceThrowSettings,
  ChanceThrow,
  ChanceThrowResult,
  IRollScoreSettings,

  CoinFlipSides,
  CoinFlip,
}

// ----------------------------------------------------------------------------
