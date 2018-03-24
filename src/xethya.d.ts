import Eventable from './base/eventable';
import XethyaObject from './base/object';
/**
 * @package Utils
 */
import assert from './utils/assert/assert';
import Range from './utils/range/range';
import AbstractCollection from './utils/collection/abstract-collection';
import Collection from './utils/collection/collection';
import { group, groupAndMap } from './utils/group-by/group-by';
/**
 * @package Random
 */
import * as BlumBlumShub from './random/blum-blum-shub';
import * as MersenneTwister from './random/mersenne-twister';
import Randomizer from './random/randomizer';
/**
 * @package Dice
 */
import * as $Dice from './dice/dice';
import { DiceThrow } from './dice/throws/dice-throw';
import { ChanceThrow } from './dice/throws/chance-throw';
import ChanceThrowResult from './dice/throws/chance-throw-result';
import SkillThrow from './dice/throws/skill-throw';
import { SkillThrowResult } from './dice/throws/skill-throw-result';
import { CoinFlip } from './dice/presets/coin-flip';
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
import { Skill } from './entity/skills/skill';
import SkillCollection from './entity/skills/skill-collection';
/**
 * @package Relationships
 */
import AbstractFaction from './relationships/abstract-faction';
import Faction from './relationships/faction';
/**
 * @package Interactions
 */
import TurnResolver from './interaction/turn-resolver';
import AbstractTurn from './interaction/abstract-turn';
import Turn from './interaction/turn';
import AbstractRound from './interaction/abstract-round';
import Round from './interaction/round';
import CombatTurn from './combat/combat-turn';
import CombatRound from './combat/combat-round';
import AbstractCombatSimulation from './combat/abstract-combat-simulation';
import CombatSimulation from './combat/combat-simulation';
declare const _default: {
    Base: {
        Eventable: typeof Eventable;
        XethyaObject: typeof XethyaObject;
    };
    Utils: {
        assert: typeof assert;
        Range: typeof Range;
        AbstractCollection: typeof AbstractCollection;
        Collection: typeof Collection;
        group: typeof group;
        groupAndMap: typeof groupAndMap;
        shuffleArray: <T>(list: T[]) => T[];
        shuffleCollection: <T>(collection: Collection<T>) => Collection<T>;
    };
    Dice: {
        Dice: typeof $Dice.Dice;
        DiceThrow: typeof DiceThrow;
        ChanceThrow: typeof ChanceThrow;
        ChanceThrowResult: typeof ChanceThrowResult;
        SkillThrow: typeof SkillThrow;
        SkillThrowResult: typeof SkillThrowResult;
        Presets: {
            CoinFlip: typeof CoinFlip;
        };
    };
    Random: {
        BlumBlumShub: typeof BlumBlumShub;
        MersenneTwister: typeof MersenneTwister;
        Randomizer: typeof Randomizer;
    };
    Entities: {
        AbstractEntity: typeof AbstractEntity;
        Entity: typeof Entity;
        AbleEntity: typeof AbleEntity;
        LivingEntity: typeof LivingEntity;
        Race: typeof Race;
        Modifier: typeof Modifier;
        BaseModifierCalculator: typeof BaseModifierCalculator;
        BaseModifier: typeof BaseModifier;
        ModifierCollection: typeof ModifierCollection;
        Attribute: typeof Attribute;
        AttributeCollection: typeof AttributeCollection;
        Stat: typeof Stat;
        StatCollection: typeof StatCollection;
        Skill: typeof Skill;
        SkillCollection: typeof SkillCollection;
    };
    Relationships: {
        Factions: {
            AbstractFaction: typeof AbstractFaction;
            Faction: typeof Faction;
        };
    };
    Interactions: {
        TurnResolver: typeof TurnResolver;
        AbstractTurn: typeof AbstractTurn;
        Turn: typeof Turn;
        AbstractRound: typeof AbstractRound;
        Round: typeof Round;
        Combat: {
            CombatTurn: typeof CombatTurn;
            CombatRound: typeof CombatRound;
            AbstractCombatSimulation: typeof AbstractCombatSimulation;
            CombatSimulation: typeof CombatSimulation;
        };
    };
};
export default _default;
