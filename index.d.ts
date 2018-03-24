import { EventEmitter } from 'eventemitter3';
import EventEmitterNS from 'eventemitter3';

export type IStatCalculator = {(stat: Entities.Stat): number};

export namespace Base {
  export class Eventable extends EventEmitter {
    constructor();
  }
  export class XethyaObject extends Eventable {
    constructor();
  }
}

export namespace Utils {
  export function assert(condition: boolean, message: string): void;
  export class AssertionError extends Error {
    constructor(message: string);
  }
  
  export type Constructable<T = any> = {new(...args: any[]): T};
  
  export interface IIndexedByString<T> {
    [index: string]: T;
  }
  export type IQuery<T> = {
    (value: T): boolean
  }
  export interface ICollection<T> {
    indexName: string;
    readonly count: number;
    
    get(id: string): T | undefined;
    getAll(): T[];
    getAllKeys(): string[];
    where(condition: IQuery<T>): T[];
    contains(id: string): boolean;
    add(...items: T[]): void;
    remove(id: string): void;
    removeAll(): void;
  }    
  export abstract class AbstractCollection<T extends {
    [index: string]: any;
  }> extends Base.Eventable implements ICollection<T> {
    indexName: string;
    protected _list: IIndexedByString<T>;
    constructor(indexName: string);
    readonly count: number;
    get(id: string): T | undefined;
    getAll(): T[];
    getAllKeys(): string[];
    where(condition: IQuery<T>): T[];
    contains(id: string): boolean;
    add(...items: T[]): void;
    remove(id: string): void;
    removeAll(): void;
  }
  export class Collection<T> extends AbstractCollection<T> {
    indexName: string;
    constructor(indexName: string);
    static fromArrayOf<T>(items: T[], indexName: string): Collection<T>;
  }
  
  export type IGroupCriteria<T> = {(value: T): string};
  export interface IGrouping<T> {
    [index: string]: T[];
  }    
  export type ITransform<T, R> = {(item: T): R};
  
  export function group<T>(array: T[], criteria: IGroupCriteria<T>): IGrouping<T>;
  export function groupAndMap<T, R>(array: T[], criteria: IGroupCriteria<T>, transform: ITransform<T, R>): IGrouping<R>;
  
  export class Range {
    lowerBound: number;
    upperBound: number;
    constructor(lowerBound: number, upperBound: number);
    includes(value: number): boolean;
    toString(): string;
    static fromArray(values: number[]): Utils.Range;
    static fromNotation(notedRange: string): Utils.Range | undefined;
  }   

  export interface IRangeable {
    getRange(): Utils.Range;
    setRange(lowerBound: number, upperBound: number): void;
  }     
  
  export function shuffleArray<T>(list: T[]): T[];
  export function shuffleCollection<T>(collection: Utils.Collection<T>): Utils.Collection<T>;
}

export namespace Random {
  export interface IRandomAlgorithm {
    readonly seedNumber: number;
    recommendsToReinstantiate(): boolean;
    generateRandom(): number;
  }
  
  export interface IRandomSettings extends IRandomAlgorithm {
    randomStrategy?: IRandomAlgorithm;
    randomStrategySettings?: object;    
  }
  
  export interface IConstructableRandomAlgorithm<T> extends IRandomAlgorithm, Utils.Constructable<T> {}
  
  export class Randomizer<Algorithm> {
    private constructorFunction;
    constructor(constructorFunction: IConstructableRandomAlgorithm<Algorithm>);
    create(randomizerSettings: object): Algorithm;
  }
  
  export namespace BlumBlumShub {
    export const P: number;
    export const Q: number;
    export const DefaultSeeds: number[];
    export type BlumBlumShubAlgorithmSettings = {
      p?: number;
      q?: number;
      seedNumber?: number;
    }
    
    export class BlumBlumShubAlgorithm implements IRandomAlgorithm {
      settings: BlumBlumShubAlgorithmSettings | undefined;
      readonly seedNumber: number;
      M: number;
      P: number;
      Q: number;
      randomIndex: number;
      constructor(settings?: BlumBlumShubAlgorithmSettings | undefined);
      static recommendsToReinstantiate(): boolean;
      recommendsToReinstantiate(): boolean;
      generateRandom(): number;
      generateRandomInteger(): number; 
    }
  }
  
  export namespace MersenneTwister {
    export const N: number;
    export const M: number;
    export const MATRIX_A: number;
    export const UPPER_MASK: number;
    export const LOWER_MASK: number;
    export const INIT_BY_ARRAY_SEED: number;
    export type MersenneTwisterAlgorithmSettings = {
      seedNumber?: number;
    };
    export class MersenneTwisterAlgorithm implements IRandomAlgorithm {
      settings: MersenneTwisterAlgorithmSettings | undefined;
      seedNumber: number;
      MT: number[];
      MTI: number;
      constructor(settings?: MersenneTwisterAlgorithmSettings | undefined);
      static recommendsToReinstantiate(): boolean;
      recommendsToReinstantiate(): boolean;
      initializeRandomGenerator(seedNumber: number): void;
      initializeByArray(initKeyArray: number[]): void;
      generateRandomInteger(): number;
      generateRandomInteger31(): number;
      generateRandomReal(): number;
      generateRandom(): number;
      generateRandomReal3(): number;
      generateRandomReal53BitResolution(): number;
    }
  }
}

export namespace Dices {
  export interface IDiceSettings {
    faces: number;
    randomStrategy?: Random.IRandomAlgorithm;
    randomStrategySettings?: object;    
  }
  
  export class Dice extends Base.XethyaObject {
    private _faces;
    private _mustPreservePrng;
    private _randomStrategy?;
    private _randomizer?;
    private _randomStrategySettings?;
    constructor({faces, randomStrategy, randomStrategySettings}?: IDiceSettings);
    _regenerateRandomStrategyIfNeeded(): void;
    private _initializeRandomizer();
    roll(): number;
    setRandomStrategy(randomStrategy: Random.IRandomAlgorithm, randomStrategySettings?: {}): void;
    faces: number;
    randomStrategy: Random.IRandomAlgorithm | undefined;
    randomStrategySettings: object | undefined;
    static rollD(faces: number): number;
  }
  
  export namespace Presets {
    export const enum CoinFlipSides {
      HEADS = 1,
      TAILS = 2,
    }
    export class CoinFlip extends Dice {
      constructor();
    }    
  }
  
  export interface IDiceThrowSettings extends Random.IRandomSettings {
    numberOfDices?: number;
    maxNumber?: number;
  }

  export const enum DiceThrowTypes {
    FAILURE = "failure",
    SUCCESS = "success",
    CRITICAL_SUCCESS = "criticalSuccess",
  }

  export interface IRollScoreSettings {
    [index: string]: Utils.Range,
    
    failure: Utils.Range,
    success: Utils.Range,
    criticalSuccess: Utils.Range,
  }

  export interface IChanceThrowSettings extends IDiceThrowSettings {
    rollScores: IRollScoreSettings;
  }

  export class DiceThrowResult {
    rolls: number[];
    constructor();
    getRollSum(): number;
  }

  export class ChanceThrowResult extends DiceThrowResult {
    private _throwType?;
    constructor(throwResult: DiceThrowResult);
    throwType: DiceThrowTypes | undefined;
  }

  export class DiceThrow {
    dices: Dice[];
    constructor({numberOfDices, maxNumber, randomStrategy, randomStrategySettings}?: IDiceThrowSettings);
    roll(): DiceThrowResult;
  }  

  export class ChanceThrow extends DiceThrow {
    settings: IChanceThrowSettings;
    constructor(settings?: IChanceThrowSettings);
    private _range(key);
    private _calculateThrowType(rollSum);
    roll(): ChanceThrowResult;
  }

  export type SkillThrowResultSettings = {
    skillValue: number;
    skillAttributesModifierValue: number;
    throwResult: ChanceThrowResult;
  };

  export class SkillThrowResult extends ChanceThrowResult {
    private _skillValue;
    private _skillAttributeModifiersValue;
    private _failureRoll?;
    constructor({skillValue, skillAttributesModifierValue, throwResult}: SkillThrowResultSettings);
    readonly skillValue: number;
    readonly skillAttributeModifiersValue: number;
    readonly totalRollValue: number;
    failureRoll: ChanceThrowResult | undefined;
  }  

  export class SkillThrow extends ChanceThrow {
    private _skill;
    constructor(skill: Entities.Skill);
    readonly skill: Entities.Skill;
    roll(): SkillThrowResult;
  }
}

export namespace Entities {
  export class Modifier extends Base.Eventable {
    private _id;
    private _value;
    private _active;
    private _source;
    constructor(id: string, value?: number, source?: any);
    id: string;
    active: boolean;
    value: number;
    source: any;
  }

  export function BaseModifierCalculator(value: number): number;
  export type IBaseModifierCalculator = {
    (value: number): number;
  }
  
  export class BaseModifier extends Modifier {
    private _calculateValue;
    constructor(calculationMethod?: IBaseModifierCalculator);
    value: number;
  }

  export class ModifierCollection extends Utils.Collection<Modifier> {
    constructor();
    add(...modifiers: Modifier[]): void;
    remove(id: string): void;
    removeAll(): void;
    setValue(id: string, value: number): void;
    activate(id: string): void;
    deactivate(id: string): void;
    getSum(): number;
    private _bindModifierEvents(modifier);
    private _unbindModifierEvents(id);
    static fromArray(modifiers: Modifier[]): ModifierCollection;
  }

  export interface IHasModifiers {
    modifiers: ModifierCollection | Utils.Collection<Modifier>;
  }

  export type AttributeSettings = {
    id: string;
    initialValue?: number;
    valueRange?: Utils.Range;
  }
  
  export class Attribute extends Base.Eventable implements IHasModifiers {
    modifiers: ModifierCollection;
    private _valueRange?: Utils.Range;
    private _rawValue: number;
    private _id: string;
    constructor({id, initialValue, valueRange}: AttributeSettings);
    private _updateBaseModifierValue();
    id: string;
    rawValue: number;
    readonly value: number;
    readonly baseModifierValue: number;
    toString(): string;
  }

  export class AttributeCollection extends Utils.Collection<Attribute> {
    constructor();
    add(...attributes: Attribute[]): void;
    remove(id: string): void;
    removeAll(): void;
    setValue(id: string, value: number): void;
    getModifierSumForAll(): number;
    private _bindAttributeEvents(attribute);
    private _unbindAttributeEvents(id);
    static fromArray(attributes: Attribute[]): AttributeCollection;
  }
  
  export interface IHasAttributes {
    attributes: AttributeCollection | Utils.Collection<Attribute>;
  }

  export type SkillSettings = {
    id: string;
    owner?: Base.XethyaObject;
    attributes?: Attribute[];
    modifiers?: Modifier[];
    primaryAttribute?: string | Attribute;
  }

  export class Skill extends Base.XethyaObject implements IHasAttributes, IHasModifiers {
    attributes: AttributeCollection;
    modifiers: ModifierCollection;
    protected _id: string;
    protected _primaryAttribute?: Attribute;
    constructor({id, owner, attributes, modifiers, primaryAttribute}: SkillSettings);
    private _setPrimaryAttribute(primaryAttribute);
    primaryAttribute: Attribute | undefined;
    readonly id: string;
    readonly value: number;
    use(): Dices.SkillThrowResult;
  }

  export class SkillCollection extends Utils.Collection<Skill> {
    constructor();
    add(...skills: Skill[]): void;
    remove(id: string): void;
    removeAll(): void;
    useSkill(id: string): Dices.SkillThrowResult;
    private _bindSkillEvents(skill);
    private _unbindSkillEvents(id);
    static fromArray(skills: Skill[]): SkillCollection;
  }

  export interface IHasSkills {
    skills: SkillCollection | Utils.Collection<Skill>
  }

  export class Stat extends Attribute implements IHasAttributes {
    attributes: AttributeCollection;
    private _calculateStat;
    private _lastCalculatedValue;
    constructor(id: string, statCalculator: IStatCalculator);
    private _valueChanged();
    readonly value: number;
  }

  export class StatCollection extends Utils.Collection<Stat> {
    constructor();
    add(...stats: Stat[]): void;
    remove(id: string): void;
    removeAll(): void;
    private _bindStatEvents(stat);
    private _unbindStatEvents(id);
    static fromArray(stats: Stat[]): StatCollection;
  }

  export interface IHasStats {
    stats: StatCollection | Utils.Collection<Stat>
  }

  export const enum MoralAlignments {
    CHAOTIC_GOOD = "chaotic:good",
    CHAOTIC_NEUTRAL = "chaotic:neutral",
    CHAOTIC_EVIL = "chaotic:evil",
    NEUTRAL_GOOD = "neutral:good",
    NEUTRAL_NEUTRAL = "neutral:neutral",
    NEUTRAL_EVIL = "neutral:evil",
    LAWFUL_GOOD = "lawful:good",
    LAWFUL_NEUTRAL = "lawful:neutral",
    LAWFUL_EVIL = "lawful:evil",
  }

  export type RaceSettings = {
    id: string;
    name: string;
    lifeExpectancy: Utils.Range;
    defaultAlignment: MoralAlignments;
    heightRange: Utils.Range;
    heritageAttributes: Attribute[];
    heritageSkills: Skill[];
    heritageStats: Stat[];
  }

  export class Race extends Base.XethyaObject implements IHasAttributes, IHasSkills, IHasStats {
    id: string;
    name: string;
    attributes: AttributeCollection;
    skills: SkillCollection;
    stats: StatCollection;
    lifeExpectancy: Utils.Range;
    defaultAlignment: MoralAlignments;
    heightRange: Utils.Range;
    constructor({id, name, lifeExpectancy, defaultAlignment, heightRange, heritageAttributes, heritageSkills, heritageStats}: RaceSettings);
  }

  export interface IEntitySettings {
    id: string;
    name: string;
    volatile: false;
    attributes: Attribute[];
    modifiers: Modifier[];
  }

  export interface IEntity extends IHasAttributes, IHasModifiers, Base.XethyaObject {
    id: string;
    name: string;
    volatile: boolean;
  }

  export abstract class AbstractEntity extends Base.XethyaObject implements IEntity {
    protected readonly _id: string;
    protected _name: string;
    protected readonly _volatile: boolean;
    protected readonly _attributes: AttributeCollection;
    protected readonly _modifiers: ModifierCollection;
    constructor({id, name, volatile, attributes, modifiers}?: IEntitySettings);
    readonly id: string;
    name: string;
    readonly volatile: boolean;
    readonly attributes: AttributeCollection;
    readonly modifiers: ModifierCollection;
  }

  export class Entity extends AbstractEntity {
    constructor(settings: IEntitySettings);
  }

  export interface IAbleEntitySettings extends IEntitySettings {
    skills: Skill[];
  }

  export class AbleEntity extends Entity implements IHasSkills {
    protected _skills: SkillCollection;
    constructor(settings: IAbleEntitySettings);
    readonly skills: SkillCollection;
  }

  export interface IFactionMemberEntity extends IEntity {
    faction: Relationships.Factions.IFaction;
  }

  export interface ILivingEntitySettings extends IAbleEntitySettings {
    race: Race;
    age: number;
    height: number;
    weight: number;
    stats: Stat[];
    faction: Relationships.Factions.IFaction;
  }

  export class LivingEntity extends AbleEntity implements IHasStats, IFactionMemberEntity {
    protected _race: Race;
    protected _age: number;
    protected _height: number;
    protected _weight: number;
    protected _stats: StatCollection;
    protected _faction: Relationships.Factions.IFaction;
    constructor(settings: ILivingEntitySettings);
    readonly stats: StatCollection;
    readonly race: Race;
    readonly age: number;
    readonly height: number;
    readonly weight: number;
    readonly faction: Relationships.Factions.IFaction;
    protected _applyRacialTraits(): void;
    protected _applyRaceAttributes(): void;
    protected _applyRaceStats(): void;
    protected _applyRaceSkills(): void;
  }
}

export namespace Relationships {
  export namespace Factions {
    export const enum FactionRelationshipStatus {
      ALLY = 'ally',
      ENEMY = 'enemy',
      NEUTRAL = 'neutral',
    }
    
    export interface IFactionRelationship {
      faction: IFaction;
      relationshipStatus: FactionRelationshipStatus;
    }

    export interface IFaction {
      id: string;
      name: string;
      allRelationships: IFactionRelationship[];
      readonly relationshipsByStatus: Utils.IGrouping<IFaction>;
    
      getAlliedFactions(): IFaction[];
      getEnemyFactions(): IFaction[];
      getNeutralFactions(): IFaction[];
    
      groupRelationshipsByStatus(): Utils.IGrouping<IFaction>;
    
      addRelationship(faction: IFaction, status: FactionRelationshipStatus): void;
    }

    export interface IFactionSettings {
      id: string,
      name: string,
    }

    export abstract class AbstractFaction implements IFaction {
      protected _id: string;
      protected _name: string;
      protected _allRelationships: IFactionRelationship[];
      protected _relationshipsByStatus: Utils.IGrouping<IFaction>;
      constructor({id, name}: IFactionSettings);
      readonly id: string;
      readonly name: string;
      allRelationships: IFactionRelationship[];
      readonly relationshipsByStatus: Utils.IGrouping<IFaction>;
      groupRelationshipsByStatus(): Utils.IGrouping<IFaction>;
      getAlliedFactions(): IFaction[];
      getNeutralFactions(): IFaction[];
      getEnemyFactions(): IFaction[];
      addRelationship(faction: IFaction, status: FactionRelationshipStatus): void;
      addAlliedRelationship(faction: IFaction): void;
      addNeutralRelationship(faction: IFaction): void;
      addEnemyRelationship(faction: IFaction): void;
    }

    export class Faction extends AbstractFaction {}
  }
}

export namespace Interactions {
  export interface IAction {
    name: string;
  }  

  export interface ITurn extends EventEmitterNS {
    readonly turnNumber: number;
    readonly owner: Entities.IEntity;
    action?: IAction;
    
    isResolved(): boolean;
    begin(): void;
    end(): void;
    resolve(action: IAction): void;
  }  

  export interface ITurnSettings {
    turnNumber: number;
    owner: Entities.IEntity;
  }

  export type TurnEvent<T = ITurn> = {
    (eventData: ITurnEvent<T>): void;
  }
  
  export interface ITurnEvent<T = ITurn> {
    turn: T;
  }

  export abstract class AbstractTurn extends EventEmitter implements ITurn {
    protected readonly _turnNumber: number;
    protected readonly _owner: Entities.IEntity;
    protected _action?: IAction;
    constructor({turnNumber, owner}: ITurnSettings);
    isResolved(): boolean;
    readonly turnNumber: number;
    readonly owner: Entities.IEntity;
    action: IAction | undefined;
    begin(): void;
    end(): void;
    resolve(action: IAction): void;
  }
  
  export class Turn extends AbstractTurn {}

  export interface IConstructableTurn<T> extends ITurn, Utils.Constructable<T> {}

  export class TurnResolver<TurnType, TurnSettingsType> {
    private constructorFunction;
    constructor(constructorFunction: IConstructableTurn<TurnType>);
    create(turnSettings: TurnSettingsType): TurnType;
  }

  export interface IRoundSettings {
    entities: Entities.IEntity[];
    roundNumber: number;
    turnType: ITurn;
  }

  export interface IRound<T = ITurn, E = Entities.IEntity> extends EventEmitterNS {
    entities: E[];
    roundNumber: number;
    turnType: T;
    turns: T[];
    currentTurn?: T;
  
    buildTurns(): void;
    buildTurnFor(entity: E, turnNumber: number): T;
    begin(): void;
    announceTurn(): void;
    updateTurn(turn: T): void;
    checkIfRoundIsComplete(): void;
  
    onTurnBegin: TurnEvent<T>;
    onTurnEnd: TurnEvent<T>;
  }

  export type RoundEvent<T = IRound> = {
    (eventData: IRoundEvent<T>): void;
  }
  
  export interface IRoundEvent<T = IRound> {
    round: T;
  }

  export abstract class AbstractRound extends Base.XethyaObject implements IRound<ITurn> {
    protected _roundNumber: number;
    protected _turnType: ITurn;
    protected _turns: ITurn[];
    protected _entities: Entities.IEntity[];
    protected _currentTurn?: ITurn;
    constructor({entities, roundNumber, turnType}: IRoundSettings);
    readonly roundNumber: number;
    readonly turnType: ITurn;
    readonly entities: Entities.IEntity[];
    readonly turns: ITurn[];
    readonly currentTurn: ITurn | undefined;
    buildTurns(): void;
    buildTurnFor(entity: Entities.IEntity, turnNumber: number): ITurn;
    onTurnBegin({turn}: ITurnEvent): void;
    onTurnEnd({turn}: ITurnEvent): void;
    begin(): void;
    announceTurn(): void;
    updateTurn(turn: ITurn): void;
    checkIfRoundIsComplete(): void;
  }

  export class Round extends AbstractRound {}

  export namespace Combat {
    export interface ICombatTurnSettings extends ITurnSettings {
      validFoes?: Entities.IFactionMemberEntity[];
    }

    export interface ICombatTurn extends ITurn {
      validFoes: Entities.IFactionMemberEntity[];
    }

    export class CombatTurn extends Turn implements ICombatTurn {
      protected _validFoes: Entities.IFactionMemberEntity[];
      constructor(settings: ICombatTurnSettings);
      validFoes: Entities.IFactionMemberEntity[];
    }    

    export interface ICombatRoundSettings extends IRoundSettings {
      entities: Entities.IFactionMemberEntity[];
      roundNumber: number;
      turnType: ICombatTurn;
    }

    export interface ICombatRound<T = ICombatTurn, E = Entities.IFactionMemberEntity> extends IRound<T, E> {
      getValidFoesFor(entity: E): E[];
    }

    export class CombatRound extends Round implements ICombatRound<ICombatTurn, Entities.IFactionMemberEntity> {
      protected _turnType: ICombatTurn;
      protected _turns: ICombatTurn[];
      protected _entities: Entities.IFactionMemberEntity[];
      protected _entitiesByFaction: Utils.IGrouping<Entities.IFactionMemberEntity>;
      protected _currentTurn?: ICombatTurn;
      constructor({entities, roundNumber, turnType}: ICombatRoundSettings);
      readonly turnType: ICombatTurn;
      readonly turns: ICombatTurn[];
      readonly entities: Entities.IFactionMemberEntity[];
      readonly currentTurn: ICombatTurn | undefined;
      buildTurnFor(entity: Entities.IFactionMemberEntity, turnNumber: number): CombatTurn;
      getValidFoesFor(entity: Entities.IFactionMemberEntity): Entities.IFactionMemberEntity[];
    }

    export type ICombatValidator = {(combat: ICombatSimulation): boolean};

    export interface ICombatFinalizationSettings {
      avoided: boolean;
    }

    export interface ICombatSimulationResult {
      avoided: boolean;
    }

    export interface ICombatSimulationSettings {
      entities: Entities.IFactionMemberEntity[],
      turnResolver?: ICombatTurn,
      challengeResolver?: ICombatValidator,
      roundRequestValidator: ICombatValidator,
    }

    export interface ICombatSimulation extends EventEmitterNS {
      readonly entities: Entities.IFactionMemberEntity[];
      readonly turnResolver: ICombatTurn;
      readonly challengeResolver: ICombatValidator;
      readonly roundRequestValidator: ICombatValidator;
      
      rounds: ICombatRound[];
      currentRound?: ICombatRound;
      
      ended: boolean;
    
      begin(): void;
      end(context?: ICombatFinalizationSettings): ICombatSimulationResult | undefined;
    
      challenge(): boolean;
      canCombat(): boolean;
    
      createRound(): ICombatRound;
      beginRound(): void;
      applyRoundResults(round: ICombatRound): void;
      calculateResults(): ICombatSimulationResult;
    
      onBeforeRoundBegin: RoundEvent<ICombatRound>;
      onRoundBegin: RoundEvent<ICombatRound>;
      onRoundComplete: RoundEvent<ICombatRound>;
      onRoundTurn: TurnEvent<ICombatTurn>;
    }

    export abstract class AbstractCombatSimulation extends Base.XethyaObject implements ICombatSimulation {
      protected readonly _entities: Entities.IFactionMemberEntity[];
      protected readonly _turnResolver: ICombatTurn;
      protected readonly _challengeResolver: ICombatValidator;
      protected readonly _roundRequestValidator: ICombatValidator;
      protected _currentRound?: ICombatRound;
      protected _rounds: ICombatRound[];
      protected _ended: boolean;
      constructor({entities, roundRequestValidator, turnResolver, challengeResolver}: ICombatSimulationSettings);
      readonly entities: Entities.IFactionMemberEntity[];
      readonly turnResolver: ICombatTurn;
      readonly challengeResolver: ICombatValidator;
      readonly roundRequestValidator: ICombatValidator;
      readonly rounds: ICombatRound<ICombatTurn, Entities.IFactionMemberEntity>[];
      readonly ended: boolean;
      readonly currentRound: ICombatRound<ICombatTurn, Entities.IFactionMemberEntity> | undefined;
      challenge(): boolean;
      begin(): void;
      canCombat(): boolean;
      createRound(): ICombatRound;
      onBeforeRoundBegin({round}: IRoundEvent<ICombatRound>): void;
      onRoundBegin({round}: IRoundEvent<ICombatRound>): void;
      onRoundComplete({round}: IRoundEvent<ICombatRound>): void;
      onRoundTurn({turn}: ITurnEvent<ICombatTurn>): void;
      applyRoundResults(round: ICombatRound): void;
      beginRound(): void;
      calculateResults(): ICombatSimulationResult;
      end(context?: ICombatFinalizationSettings): ICombatSimulationResult | undefined;
    }

    export class CombatSimulation extends AbstractCombatSimulation {}
  }
}