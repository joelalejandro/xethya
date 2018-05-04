import Eventable from './base/eventable';
import XethyaObject from './base/object';

// ----------------------------------------------------------------------------

/**
 * @package Base
 */
const Base = {
  Eventable,
  XethyaObject,
};

// ----------------------------------------------------------------------------

/**
 * @package Utils
 */
import assert from './utils/assert/assert';
import Range from './utils/range/range';
import AbstractCollection from './utils/collection/abstract-collection';
import Collection from './utils/collection/collection';
import { group, groupAndMap } from './utils/group-by/group-by';
import { shuffleArray, shuffleCollection } from './utils/shuffle/shuffle';

const Utils = {
  assert,

  Range,
  AbstractCollection,
  Collection,

  group,
  groupAndMap,

  shuffleArray,
  shuffleCollection,
}

// ----------------------------------------------------------------------------

/**
 * @package Random
 */

import * as BlumBlumShub from './random/blum-blum-shub';
import * as MersenneTwister from './random/mersenne-twister';
import Randomizer from './random/randomizer';

const Random = {
  BlumBlumShub,
  MersenneTwister,
  Randomizer,
};

// ----------------------------------------------------------------------------

/**
 * @package Dice
 */

import { Dice } from './dice/dice';

import { DiceThrow } from './dice/throws/dice-throw';
import DiceThrowResult from './dice/throws/dice-throw-result';
import { ChanceThrow } from './dice/throws/chance-throw';
import ChanceThrowResult from './dice/throws/chance-throw-result';
import SkillThrow from './dice/throws/skill-throw';
import { SkillThrowResult } from './dice/throws/skill-throw-result';

import { CoinFlip, CoinFlipSides } from './dice/presets/coin-flip';

const Dices = {
  Dice,
  DiceThrow,
  ChanceThrow,
  ChanceThrowResult,
  SkillThrow,
  SkillThrowResult,
  Presets: {
    CoinFlip,
  },
}

// ----------------------------------------------------------------------------

/**
 * @package Entities
 */

import { AbstractEntity } from './entity/abstract-entity';
import Entity from './entity/entity';
import { AbleEntity } from './entity/able-entity';
import { LivingEntity } from './entity/living-entity';
import { Race } from './entity/race/race';
import Modifier from './entity/modifiers/modifier';
import BaseModifier from './entity/modifiers/base-modifier';
import { BaseModifierCalculator } from './entity/modifiers/base-modifier-calculator';
import ModifierCollection from './entity/modifiers/modifier-collection';
import { Attribute } from './entity/attributes/attribute';
import AttributeCollection from './entity/attributes/attribute-collection';
import Stat from './entity/stats/stat';
import StatCollection from './entity/stats/stat-collection';
import { Skill, SkillSettings } from './entity/skills/skill';
import SkillCollection from './entity/skills/skill-collection';

const Entities = {
  AbstractEntity,
  Entity,
  AbleEntity,
  LivingEntity,
  Race,
  Modifier,
  BaseModifierCalculator,
  BaseModifier,
  ModifierCollection,
  Attribute,
  AttributeCollection,
  Stat,
  StatCollection,
  Skill,
  SkillCollection,
};

// ----------------------------------------------------------------------------

/**
 * @package Relationships
 */

import AbstractFaction from './relationships/abstract-faction';
import Faction from './relationships/faction';

const Relationships = {
  Factions: {
    AbstractFaction,
    Faction,
  }
};

// ----------------------------------------------------------------------------

/**
 * @package Interactions
 */

import AbstractTurn from './interaction/abstract-turn';
import Turn from './interaction/turn';
import AbstractRound from './interaction/abstract-round';
import Round from './interaction/round';
import CombatTurn from './combat/combat-turn';
import CombatRound from './combat/combat-round';
import AbstractCombatSimulation from './combat/abstract-combat-simulation';
import CombatSimulation from './combat/combat-simulation';
import IStatCalculator from './entity/stats/stat-calculator.i';

const Interactions = {
  AbstractTurn,
  Turn,
  AbstractRound,
  Round,
  Combat: {
    CombatTurn,
    CombatRound,
    AbstractCombatSimulation,
    CombatSimulation,
  }
};

export {
  Base,
  Utils,
  Dices,
  Random,
  Entities,
  Relationships,
  Interactions,

  IStatCalculator,
};
