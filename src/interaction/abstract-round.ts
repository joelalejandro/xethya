import XethyaObject from '../base/object';

import ITurn from './turn.i';
import IRound from './round.i';
import IEntity from '../entity/entity.i';
import ITurnSettings from './turn-settings.i';
import IRoundSettings from './round-settings.i';

import IConstructableTurn from './constructable-turn.i';
import { ITurnEvent } from './turn-event.i';
import Factory from '../utils/factory';
import IConstructable from '../utils/constructable.i';

export default abstract class AbstractRound<T extends ITurn> extends XethyaObject implements IRound<ITurn> {
  protected _roundNumber: number;
  protected _turnType: IConstructable<T>;
  protected _turns: T[];
  protected _entities: IEntity[];
  protected _currentTurn?: ITurn;

  constructor({ entities, roundNumber, turnType }: IRoundSettings<T>) {
    super();

    this._roundNumber = roundNumber;
    this._turnType = turnType;
    this._entities = entities;

    this._turns = [];
  }

  get roundNumber() {
    return this._roundNumber;
  }

  get turnType() {
    return this._turnType;
  }

  get entities() {
    return this._entities;
  }

  get turns() {
    return this._turns;
  }

  get currentTurn() {
    return this._currentTurn;
  }

  buildTurns(): void {
    this._entities.forEach((entity, index) => {
      const turn = this.buildTurnFor(entity, index + 1);
      this._turns.push(turn);
    });
  }

  buildTurnFor(entity: IEntity, turnNumber: number): T {
    const turn = Factory.create(this.turnType, { owner: entity, turnNumber });

    turn.on('begin', this.onTurnBegin.bind(this));
    turn.on('end', this.onTurnEnd.bind(this));

    return turn;
  }

  onTurnBegin({ turn }: ITurnEvent): void {
    this.emit('turn', { turn });
  }

  onTurnEnd({ turn }: ITurnEvent): void {
    this.updateTurn(turn);
  }

  begin(): void {
    this.emit('before:begin', { round: this });

    this.buildTurns();
    this.announceTurn();

    this.emit('begin', { round: this });
  }

  announceTurn(): void {
    const nextTurn: ITurn = this._turns.find(turn => !turn.isResolved()) as ITurn;
    this._currentTurn = nextTurn;

    nextTurn.begin();
  }

  updateTurn(turn: ITurn): void {
    const previousTurnIndex = turn.turnNumber - 1;

    this._turns[previousTurnIndex].action = turn.action;
    this.checkIfRoundIsComplete();
  }

  checkIfRoundIsComplete(): void {
    if (this._turns.every(turn => turn.isResolved())) {
      this.emit('complete', { round: this });
    } else {
      this.announceTurn();
    }
  }
}
