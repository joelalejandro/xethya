import { EventEmitter } from 'eventemitter3';
import IEntity from '../entity/entity.i';
import ITurn from './turn.i';
import ITurnSettings from './turn-settings.i';
import IAction from './action.i';

export default abstract class AbstractTurn extends EventEmitter implements ITurn {
  protected readonly _turnNumber: number;
  protected readonly _owner: IEntity;
  protected _action?: IAction;
  
  constructor({ turnNumber, owner }: ITurnSettings) {
    super();
    
    this._turnNumber = turnNumber;
    this._owner = owner;
  }

  isResolved(): boolean {
    return this._action !== null && this._action !== undefined;
  }

  get turnNumber() {
    return this._turnNumber;
  }

  get owner() {
    return this._owner;
  }

  get action() {
    return this._action;
  }

  set action(newAction) {
    this._action = newAction;
  }

  begin() {
    this.emit('begin', { turn: this });
  }

  end() {
    this.emit('end', { turn: this });
  }

  resolve(action: IAction): void {
    this._action = action;
  }
}