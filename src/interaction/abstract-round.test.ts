import 'mocha';
import { expect } from 'chai';
import AbstractRound from './abstract-round';
import Entity from '../entity/entity';
import AbstractTurn from './abstract-turn';
import Turn from './turn';
import ITurn from './turn.i';
import IConstructableTurn from './constructable-turn.i';
import { ITurnEvent } from './turn-event.i';

class MyRound extends AbstractRound {};

let round: MyRound;

const entity = new Entity({
  id: 'entity1',
  name: 'Entity 1',
  attributes: [],
  modifiers: [],
  volatile: false,
});

const entity2 = new Entity({
  id: 'entity2',
  name: 'Entity 2',
  attributes: [],
  modifiers: [],
  volatile: false,
});

const entities: Entity[] = [entity, entity2];

describe('Interaction.AbstractRound', () => {
  beforeEach(() => {
    round = new MyRound({
      entities,
      roundNumber: 1,
      turnType: Turn as IConstructableTurn<Turn>,
    });
  });
  it('should create a round with the expected input', () => {
    expect(round.entities).to.deep.equal(entities);
    expect(round.roundNumber).to.equal(1);
    expect(round.turnType).to.equal(Turn);
    expect(round.turns).to.be.empty;
  });
  describe('#begin', () => {
    it('should trigger "before:begin" event', (done) => {
      round.once('before:begin', (eventData: { round: MyRound }) => {
        expect(round).to.deep.equal(eventData.round);
        done();
      });

      round.begin();
    });
    it('should trigger "begin" event', (done) => {
      round.once('begin', (eventData: { round: MyRound }) => {
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
    const turnForEntity1 = round.buildTurnFor(entity, 1);
    
    expect(turnForEntity1.owner).to.deep.equal(entity);
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
    let currentTurn: ITurn;
    
    round.once('complete', () => {
      expect(round.turns.every(turn => turn.isResolved())).to.be.true;
      done();
    });

    round.on('turn', () => {
      currentTurn = round.currentTurn as ITurn;
      currentTurn.resolve({ name: 'bar' });
      currentTurn.end();
    });

    round.begin();
  });
});