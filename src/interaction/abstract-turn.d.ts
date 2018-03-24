import { EventEmitter } from 'eventemitter3';
import IEntity from '../entity/entity.i';
import ITurn from './turn.i';
import ITurnSettings from './turn-settings.i';
import IAction from './action.i';
export default abstract class AbstractTurn extends EventEmitter implements ITurn {
    protected readonly _turnNumber: number;
    protected readonly _owner: IEntity;
    protected _action?: IAction;
    constructor({turnNumber, owner}: ITurnSettings);
    isResolved(): boolean;
    readonly turnNumber: number;
    readonly owner: IEntity;
    action: IAction | undefined;
    begin(): void;
    end(): void;
    resolve(action: IAction): void;
}
