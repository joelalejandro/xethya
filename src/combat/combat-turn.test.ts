import 'mocha';
import { expect } from 'chai';

import CombatTurn from './combat-turn';
import { LivingEntity, ILivingEntitySettings } from '../entity/living-entity';
import IAction from '../interaction/action.i';
import IFactionMemberEntity from '../entity/faction-member-entity.i';
import Faction from '../relationships/faction';
import { Race } from '../entity/race/race';
import Range from '../utils/range/range';
import { MoralAlignments } from '../entity/abstract-entity';

let turn: CombatTurn;
let entity: LivingEntity;

const goodFaction: Faction = new Faction({
  id: 'goods',
  name: 'The Goods'
});

const evilFaction: Faction = new Faction({
  id: 'bads',
  name: 'The Bads'
});

const humans: Race = new Race({
  id: 'human',
  name: 'Human',
  lifeExpectancy: Range.fromArray([90, 100]),
  defaultAlignment: MoralAlignments.NEUTRAL_NEUTRAL,
  heightRange: Range.fromArray([150, 200]),
  heritageAttributes: [],
  heritageSkills: [],
  heritageStats: [],
});

const entityConfiguration: ILivingEntitySettings = {
  id: 'entity',
  name: 'Entity',
  attributes: [],
  modifiers: [],
  volatile: false,
  skills: [],
  stats: [],
  age: 0,
  faction: goodFaction,
  height: 165,
  race: humans,
  weight: 100,
};

const foeConfiguration = (id: string, name: string): ILivingEntitySettings => {
  return {
    id,
    name,
    attributes: [],
    modifiers: [],
    volatile: false,
    skills: [],
    stats: [],
    age: 0,
    faction: evilFaction,
    height: 165,
    race: humans,
    weight: 100,
  };
};

const validFoes: IFactionMemberEntity[] = [
  new LivingEntity(foeConfiguration('entity2', 'Entity 2')),
  new LivingEntity(foeConfiguration('entity3', 'Entity 3')),
];

const validFoesAlternative: IFactionMemberEntity[] = [
  new LivingEntity(foeConfiguration('entity2', 'Entity 2')),
  new LivingEntity(foeConfiguration('entity3', 'Entity 3')),
  new LivingEntity(foeConfiguration('entity4', 'Entity 4')),
];

describe('Combat.CombatTurn', () => {
  beforeEach(() => {
    entity = new LivingEntity(entityConfiguration);
    turn = new CombatTurn({
      turnNumber: 1,
      owner: entity,
      validFoes,
    });
  });
  it('should create the turn with the expected input', () => {
    expect(turn.turnNumber).to.equal(1);
    expect(turn.owner).to.deep.equal(entity);
    expect(turn.action).to.be.undefined;
    expect(turn.validFoes).to.deep.equal(validFoes);
  });
  it('should allow to create a combat turn without valid foes', () => {
    const alternativeTurn = new CombatTurn({ turnNumber: 1, owner: entity });
    expect(alternativeTurn.turnNumber).to.equal(1);
    expect(alternativeTurn.owner).to.deep.equal(entity);
    expect(alternativeTurn.action).to.be.undefined;
    expect(alternativeTurn.validFoes).to.be.empty;
  });
  it('should allow changing validFoes', () => {
    turn.validFoes = validFoesAlternative;
    expect(turn.validFoes).to.deep.equal(validFoesAlternative);
  });
  it('should trigger "emit" event with #begin()', (done) => {
    turn.once('begin', (context: { turn: CombatTurn }) => {
      expect(context.turn).to.deep.equal(turn);
      done();
    });
    turn.begin();
  });
  it('should trigger "end" event with #end()', (done) => {
    turn.once('end', (context: { turn: CombatTurn }) => {
      expect(context.turn).to.deep.equal(turn);
      done();
    });
    turn.end();
  });
  it('should be resolved if action is defined', () => {
    expect(turn.isResolved()).to.be.false;
  });
  it('should not be resolved if action is undefined', () => {
    turn.resolve({ name: 'foo' } as IAction);
    expect(turn.isResolved()).to.be.true;
  });
});