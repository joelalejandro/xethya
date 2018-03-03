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

import IQuery from './utils/collection/query.i';
import IIndexedByString from './utils/collection/indexed-by-string.i';
import ICollection from './utils/collection/collection.i';
import AbstractCollection from './utils/collection/abstract-collection';
import Collection from './utils/collection/collection';

export {
  assert,

  Range,
  IRangeable,

  Constructable,

  IQuery,
  IIndexedByString,
  ICollection,
  AbstractCollection,
  Collection,
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
import SkillThrow from './dice/throws/skill-throw';
import { SkillThrowResult, SkillThrowResultSettings }from './dice/throws/skill-throw-result';
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
  SkillThrow,
  SkillThrowResult,
  SkillThrowResultSettings,
  IRollScoreSettings,

  CoinFlipSides,
  CoinFlip,
}

// ----------------------------------------------------------------------------

/**
 * @package Entity
 */

import { AbstractEntity, IEntitySettings, MoralAlignments } from './entity/abstract-entity';
import Entity from './entity/entity';
import IEntity from './entity/entity.i';
import { AbleEntity, IAbleEntitySettings } from './entity/able-entity';
import { LivingEntity, ILivingEntitySettings } from './entity/living-entity';
import { Race, RaceSettings } from './entity/race/race';

export {
  IEntitySettings,
  IEntity,
  AbstractEntity,
  Entity,
  IAbleEntitySettings,
  AbleEntity,
  ILivingEntitySettings,
  LivingEntity,
  MoralAlignments,
  RaceSettings,
  Race,
}

/**
 * @namespace Modifiers
 */

import Modifier from './entity/modifiers/modifier';
import BaseModifier from './entity/modifiers/base-modifier';
import { BaseModifierCalculator, IBaseModifierCalculator } from './entity/modifiers/base-modifier-calculator';
import ModifierCollection from './entity/modifiers/modifier-collection';
import IHasModifiers from './entity/modifiers/has-modifiers.i';

export {
  Modifier,
  IBaseModifierCalculator,
  BaseModifierCalculator,
  BaseModifier,
  ModifierCollection,
  IHasModifiers,
}

/**
 * @namespace Attributes
 */

import { Attribute, AttributeSettings } from './entity/attributes/attribute';
import AttributeCollection from './entity/attributes/attribute-collection';
import IHasAttributes from './entity/attributes/has-attributes.i';

export {
  AttributeSettings,
  Attribute,
  AttributeCollection,
  IHasAttributes,
};

/**
 * @namespace Stats
 */

import IStatCalculator from './entity/stats/stat-calculator.i';
import Stat from './entity/stats/stat';
import StatCollection from './entity/stats/stat-collection';
import IHasStats from './entity/stats/has-stats.i';

export {
  IStatCalculator,
  Stat,
  StatCollection,
  IHasStats,
};

/**
 * @namespace Skills
 */

import { Skill, SkillSettings } from './entity/skills/skill';
import SkillCollection from './entity/skills/skill-collection';
import IHasSkills from './entity/skills/has-skills.i';

export {
  Skill,
  SkillSettings,
  SkillCollection,
  IHasSkills,
};