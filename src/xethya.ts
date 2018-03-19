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

import IGrouping from './utils/group-by/grouping.i';
import ITransform from './utils/group-by/transform.i';
import IGroupCriteria from './utils/group-by/group-criteria.i';
import { group, groupAndMap } from './utils/group-by/group-by';

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

  IGrouping,
  IGroupCriteria,
  ITransform,
  group,
  groupAndMap,
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

// ----------------------------------------------------------------------------

/**
 * @package Relationships
 */

import IFaction from './relationships/faction.i';
import IFactionSettings from './relationships/faction-settings.i';
import AbstractFaction from './relationships/abstract-faction';
import Faction from './relationships/faction';
import IFactionRelationship from './relationships/faction-relationship.i';
import { FactionRelationshipStatus } from './relationships/faction-relationship-status';

export {
  IFaction,
  IFactionSettings,
  AbstractFaction,
  Faction,
  FactionRelationshipStatus,
  IFactionRelationship,
};

// ----------------------------------------------------------------------------

/**
 * @package Interaction
 */

/**
 * @namespace Turn
 */

import IAction from './interaction/action.i';
import ITurnSettings from './interaction/turn-settings.i';
import ITurn from './interaction/turn.i';
import { TurnEvent, ITurnEvent } from './interaction/turn-event.i';
import IConstructableTurn from './interaction/constructable-turn.i';
import TurnResolver from './interaction/turn-resolver';
import AbstractTurn from './interaction/abstract-turn';
import Turn from './interaction/turn';

export {
  IAction,
  ITurnSettings,
  ITurn,
  TurnEvent,
  ITurnEvent,
  IConstructableTurn,
  TurnResolver,
  AbstractTurn,
  Turn,
};

/**
 * @namespace Round
 */

import IRound from './interaction/round.i';
import IRoundSettings from './interaction/round-settings.i';
import { RoundEvent, IRoundEvent } from './interaction/round-event.i';
import AbstractRound from './interaction/abstract-round';
import Round from './interaction/round';

export {
  IRound,
  IRoundSettings,
  RoundEvent,
  IRoundEvent,
  AbstractRound,
  Round,
};

// ----------------------------------------------------------------------------

/**
 * @package Combat
 */

import ICombatTurn from './combat/combat-turn.i';
import ICombatTurnSettings from './combat/combat-turn-settings.i';
import CombatTurn from './combat/combat-turn';
import IConstructableCombatTurn from './combat/constructable-combat-turn.i';
import ICombatRound from './combat/combat-round.i';
import ICombatRoundSettings from './combat/combat-round-settings.i';
import ICombatValidator from './combat/combat-validator.i';
import CombatRound from './combat/combat-round';
import ICombatSimulation from './combat/combat-simulation.i';
import ICombatSimulationSettings from './combat/combat-simulation-settings.i';
import ICombatSimulationResult from './combat/combat-simulation-result.i';
import ICombatFinalizationSettings from './combat/combat-finalization-settings.i';
import AbstractCombatSimulation from './combat/abstract-combat-simulation';
import CombatSimulation from './combat/combat-simulation';

export {
  ICombatTurn,
  ICombatTurnSettings,
  CombatTurn,
  IConstructableCombatTurn,

  ICombatRound,
  ICombatRoundSettings,
  ICombatValidator,
  CombatRound,

  ICombatSimulation,
  ICombatSimulationSettings,
  ICombatSimulationResult,
  ICombatFinalizationSettings,
  AbstractCombatSimulation,
  CombatSimulation,
};