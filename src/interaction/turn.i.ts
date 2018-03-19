import IAction from './action.i';
import IEntity from '../entity/entity.i';
import EventEmitter from 'eventemitter3';

export default interface ITurn extends EventEmitter {
  readonly turnNumber: number;
  readonly owner: IEntity;
  action?: IAction;
  
  isResolved(): boolean;
  begin(): void;
  end(): void;
  resolve(action: IAction): void;
}