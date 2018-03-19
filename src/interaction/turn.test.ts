import 'mocha';
import { expect } from 'chai';

import Turn from './turn';
import Entity from '../entity/entity';
import IAction from './action.i';

let turn: Turn;
let entity: Entity;

describe('Interaction.Turn', () => {
  beforeEach(() => {
    entity = new Entity({
      id: 'entity',
      name: 'Entity',
      attributes: [],
      modifiers: [],
      volatile: false,
    });
    turn = new Turn({
      turnNumber: 1,
      owner: entity,
    });
  });
  it('should create the turn with the expected input', () => {
    expect(turn.turnNumber).to.equal(1);
    expect(turn.owner).to.deep.equal(entity);
    expect(turn.action).to.be.undefined;
  });
  it('should trigger "emit" event with #begin()', (done) => {
    turn.once('begin', (context: { turn: Turn }) => {
      expect(context.turn).to.deep.equal(turn);
      done();
    });
    turn.begin();
  });
  it('should trigger "end" event with #end()', (done) => {
    turn.once('end', (context: { turn: Turn }) => {
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