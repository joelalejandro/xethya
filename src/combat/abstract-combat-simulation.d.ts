import XethyaObject from '../base/object';
import ICombatSimulation from './combat-simulation.i';
import IFactionMemberEntity from '../entity/faction-member-entity.i';
import ICombatSimulationSettings from './combat-simulation-settings.i';
import ICombatValidator from './combat-validator.i';
import ICombatTurn from './combat-turn.i';
import ICombatRound from './combat-round.i';
import { IRoundEvent } from '../interaction/round-event.i';
import { ITurnEvent } from '../interaction/turn-event.i';
import ICombatFinalizationSettings from './combat-finalization-settings.i';
import ICombatSimulationResult from './combat-simulation-result.i';
export default abstract class AbstractCombatSimulation extends XethyaObject implements ICombatSimulation {
    protected readonly _entities: IFactionMemberEntity[];
    protected readonly _turnResolver: ICombatTurn;
    protected readonly _challengeResolver: ICombatValidator;
    protected readonly _roundRequestValidator: ICombatValidator;
    protected _currentRound?: ICombatRound;
    protected _rounds: ICombatRound[];
    protected _ended: boolean;
    constructor({entities, roundRequestValidator, turnResolver, challengeResolver}: ICombatSimulationSettings);
    readonly entities: IFactionMemberEntity[];
    readonly turnResolver: ICombatTurn;
    readonly challengeResolver: ICombatValidator;
    readonly roundRequestValidator: ICombatValidator;
    readonly rounds: ICombatRound<ICombatTurn, IFactionMemberEntity>[];
    readonly ended: boolean;
    readonly currentRound: ICombatRound<ICombatTurn, IFactionMemberEntity> | undefined;
    challenge(): boolean;
    begin(): void;
    canCombat(): boolean;
    createRound(): ICombatRound;
    onBeforeRoundBegin({round}: IRoundEvent<ICombatRound>): void;
    onRoundBegin({round}: IRoundEvent<ICombatRound>): void;
    onRoundComplete({round}: IRoundEvent<ICombatRound>): void;
    onRoundTurn({turn}: ITurnEvent<ICombatTurn>): void;
    applyRoundResults(round: ICombatRound): void;
    beginRound(): void;
    calculateResults(): ICombatSimulationResult;
    end(context?: ICombatFinalizationSettings): ICombatSimulationResult | undefined;
}
