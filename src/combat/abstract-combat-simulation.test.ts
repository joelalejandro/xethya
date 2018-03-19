import 'mocha';
import chai from 'chai';
import { expect } from 'chai';
import spies from 'chai-spies';

import Faction from '../relationships/faction';
import { Race } from '../entity/race/race';
import Range from '../utils/range/range';
import { MoralAlignments } from '../entity/abstract-entity';
import { LivingEntity, ILivingEntitySettings } from '../entity/living-entity';
import AbstractCombatSimulation from './abstract-combat-simulation';
import ICombatValidator from './combat-validator.i';
import ICombatSimulation from './combat-simulation.i';
import CombatTurn from './combat-turn';
import CombatRound from './combat-round';
import ICombatRound from './combat-round.i';
import { IRoundEvent } from '../interaction/round-event.i';
import ICombatSimulationResult from './combat-simulation-result.i';

chai.use(spies);

class MyCombatSimulation extends AbstractCombatSimulation {};

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

let combat: MyCombatSimulation;
let round: ICombatRound;

let roundRequestValidator: ICombatValidator = (combat) => combat.rounds.length < 5;

describe('Combat.AbstractCombatSimulation', () => {
  beforeEach(() => {
    combat = new MyCombatSimulation({
      entities,
      roundRequestValidator,
    });
  });
  it('should create the simulation with the expected input', () => {
    expect(combat.entities).to.deep.equal(entities);
    expect(combat.roundRequestValidator).to.equal(roundRequestValidator);
    expect(combat.turnResolver).to.equal(CombatTurn);
    expect(combat.challengeResolver(combat)).to.be.true;
    expect(combat.rounds).to.be.empty;
    expect(combat.ended).to.be.false;
  });
  it('should call challengeResolver when checking for challenge', () => {
    const spy = chai.spy.on(combat, 'challengeResolver');

    expect(combat.challenge()).to.be.true;
    expect(spy).to.have.been.called;
  });
  it('should call roundRequestValidator when checking if a new round can be created', () => {
    const spy = chai.spy.on(combat, 'roundRequestValidator');

    expect(combat.canCombat()).to.be.true;
    expect(spy).to.have.been.called;
  });
  describe('should create a round', () => {
    beforeEach(() => {
      round = combat.createRound();
    });
    it('with the expected input', () => {
      expect(round.entities).to.deep.equal(entities);
      expect(round.roundNumber).to.equal(1);
      expect(round.turnType).to.equal(combat.turnResolver);
    });
    it('with the proper event listeners', () => {
      const listeners = round.eventNames();

      expect(listeners).to.contain('before:begin');
      expect(listeners).to.contain('begin');
      expect(listeners).to.contain('complete');
      expect(listeners).to.contain('turn');
    });
  });
  it('should end combat if no round can be created', () => {
    combat = new MyCombatSimulation({
      entities,
      roundRequestValidator: () => false,
    });

    combat.begin();
    expect(combat.currentRound).to.be.undefined;
  });
  it('should begin the first round if round can be created', (done) => {
    combat.once('begin:round', ({ round }: IRoundEvent<ICombatRound>) => {
      expect(round.roundNumber).to.equal(1);
      done();
    });

    combat.begin();
  });
  it('should save the round once it is finished', (done) => {
    let currentRound: CombatRound;

    combat.once('after:round', () => {
      combat.once('begin:round', () => {
        expect(combat.rounds.length).to.equal(1);
        expect(combat.rounds[0]).to.deep.equal(currentRound);
        done();
      });
    });

    combat.begin();
    
    currentRound = combat.currentRound as CombatRound;

    currentRound.turns.forEach((turn) => {
      turn.resolve({ name: 'foo' });
      turn.end();
    });
  });
  it('should not allow a combat to start if it has ended', () => {
    combat.begin();
    combat.end();

    combat.once('before:combat', () => {
      throw new Error('test failed: combat should not have started');
    });

    combat.begin();
  });
  it('should end a combat as "avoided" if challenge fails', (done) => {
    combat = new MyCombatSimulation({
      entities,
      roundRequestValidator: () => true,
      challengeResolver: () => false,
    });

    combat.once('end', (results: ICombatSimulationResult) => {
      expect(results.avoided).to.be.true;
      done();
    });

    combat.begin();
  });
});