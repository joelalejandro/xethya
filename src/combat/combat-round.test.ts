import 'mocha';
import { expect } from 'chai';
import CombatRound from './combat-round';
import { LivingEntity, ILivingEntitySettings } from '../entity/living-entity';
import CombatTurn from './combat-turn';
import ICombatTurn from './combat-turn.i';
import { ITurnEvent } from '../interaction/turn-event.i';
import Faction from '../relationships/faction';
import { Race } from '../entity/race/race';
import Range from '../utils/range/range';
import { MoralAlignments } from '../entity/abstract-entity';
import IConstructableCombatTurn from './constructable-combat-turn.i';

let round: CombatRound;

const goodFaction: Faction = new Faction({
  id: 'goods',
  name: 'The Goods',
});

const evilFaction: Faction = new Faction({
  id: 'bads',
  name: 'The Bads',
});

const neutralFaction: Faction = new Faction({
  id: 'balance',
  name: 'The Balance',
});

goodFaction.addEnemyRelationship(evilFaction);
evilFaction.addEnemyRelationship(goodFaction);
goodFaction.addNeutralRelationship(neutralFaction);
neutralFaction.addNeutralRelationship(goodFaction);

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

const entityConfigurator = (id: string, name: string, faction: Faction): ILivingEntitySettings => {
  return {
    id,
    name,
    attributes: [],
    modifiers: [],
    volatile: false,
    skills: [],
    stats: [],
    age: 0,
    faction,
    height: 165,
    race: humans,
    weight: 100,
  };
};

const alphaEntity = new LivingEntity(entityConfigurator('a', 'Alpha', goodFaction));
const betaEntity = new LivingEntity(entityConfigurator('b', 'Beta', evilFaction));
const gammaEntity = new LivingEntity(entityConfigurator('c', 'Gamma', goodFaction));
const deltaEntity = new LivingEntity(entityConfigurator('d', 'Delta', neutralFaction));

const entities: LivingEntity[] = [alphaEntity, betaEntity, gammaEntity, deltaEntity];

describe('Combat.CombatRound', () => {
  beforeEach(() => {
    round = new CombatRound({
      entities,
      roundNumber: 1,
      turnType: CombatTurn as IConstructableCombatTurn<CombatTurn>,
    });
  });
  it('should create a round with the expected input', () => {
    expect(round.entities).to.deep.equal(entities);
    expect(round.roundNumber).to.equal(1);
    expect(round.turnType).to.equal(CombatTurn);
    expect(round.turns).to.be.empty;
  });
  describe('#begin', () => {
    it('should trigger "before:begin" event', (done) => {
      round.once('before:begin', (eventData: { round: CombatRound }) => {
        expect(round).to.deep.equal(eventData.round);
        done();
      });

      round.begin();
    });
    it('should trigger "begin" event', (done) => {
      round.once('begin', (eventData: { round: CombatRound }) => {
        expect(round).to.deep.equal(eventData.round);
        done();
      });

      round.begin();
    });
    it('should fill the turns list', () => {
      round.begin();
      expect(round.turns).to.not.be.empty;
    });
    it('should announce the first turn', (done) => {
      round.once('turn', ({ turn }: ITurnEvent) => {
        expect(turn).to.deep.equal(round.turns[0]);
        done();
      });

      round.begin();
    });
  });
  it('should build a turn for a given entity', () => {
    const turnForEntity1 = round.buildTurnFor(alphaEntity, 1);
    
    expect(turnForEntity1.owner).to.deep.equal(alphaEntity);
    expect(turnForEntity1.turnNumber).to.equal(1);
  });
  it('should build turns for all entities', () => {
    round.buildTurns();
    expect(round.turns.length).to.equal(round.entities.length);
  });
  it('should select the first non-resolved turn when announcing a turn', (done) => {
    round.begin();
    round.turns[0].resolve({ name: 'foo' });

    round.once('turn', ({ turn }: ITurnEvent) => {
      expect(turn).to.deep.equal(round.turns[1]);
      done();
    });

    round.announceTurn();
  });
  it('should update a turn and check if round is over', (done) => {
    round.begin();
    round.turns[0].resolve({ name: 'foo' });

    round.once('turn', ({ turn }: ITurnEvent) => {
      expect(turn).to.deep.equal(round.turns[1]);
      expect(round.turns.every(turn => turn.isResolved())).to.be.false;
      done();
    });

    round.turns[0].end();
  });
  it('should trigger "complete" when a round is finished', (done) => {
    let currentTurn: ICombatTurn;
    
    round.once('complete', () => {
      expect(round.turns.every(turn => turn.isResolved())).to.be.true;
      done();
    });

    round.on('turn', () => {
      currentTurn = round.currentTurn as ICombatTurn;
      currentTurn.resolve({ name: 'bar' });
      currentTurn.end();
    });

    round.begin();
  });
});