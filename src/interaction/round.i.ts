import ITurn from './turn.i';
import IEntity from '../entity/entity.i';
import { TurnEvent } from './turn-event.i';
import EventEmitter from 'eventemitter3';

export default interface IRound<T = ITurn, E = IEntity> extends EventEmitter {
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