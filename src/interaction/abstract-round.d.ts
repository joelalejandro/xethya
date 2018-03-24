import XethyaObject from '../base/object';
import ITurn from './turn.i';
import IRound from './round.i';
import IEntity from '../entity/entity.i';
import IRoundSettings from './round-settings.i';
import { ITurnEvent } from './turn-event.i';
export default abstract class AbstractRound extends XethyaObject implements IRound<ITurn> {
    protected _roundNumber: number;
    protected _turnType: ITurn;
    protected _turns: ITurn[];
    protected _entities: IEntity[];
    protected _currentTurn?: ITurn;
    constructor({entities, roundNumber, turnType}: IRoundSettings);
    readonly roundNumber: number;
    readonly turnType: ITurn;
    readonly entities: IEntity[];
    readonly turns: ITurn[];
    readonly currentTurn: ITurn | undefined;
    buildTurns(): void;
    buildTurnFor(entity: IEntity, turnNumber: number): ITurn;
    onTurnBegin({turn}: ITurnEvent): void;
    onTurnEnd({turn}: ITurnEvent): void;
    begin(): void;
    announceTurn(): void;
    updateTurn(turn: ITurn): void;
    checkIfRoundIsComplete(): void;
}
