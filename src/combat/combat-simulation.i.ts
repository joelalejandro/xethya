import IFactionMemberEntity from '../entity/faction-member-entity.i';
import ICombatRound from './combat-round.i';
import ICombatTurn from './combat-turn.i';
import ICombatValidator from './combat-validator.i';
import EventEmitter from 'eventemitter3';
import ICombatSimulationResult from './combat-simulation-result.i';
import ICombatFinalizationSettings from './combat-finalization-settings.i';
import { RoundEvent } from '../interaction/round-event.i';
import { TurnEvent } from '../interaction/turn-event.i';
import IConstructable from '../utils/constructable.i';

export default interface ICombatSimulation extends EventEmitter {
  readonly entities: IFactionMemberEntity[];
  readonly turnResolver: IConstructable<ICombatTurn>;
  readonly challengeResolver: ICombatValidator;
  readonly roundRequestValidator: ICombatValidator;

  rounds: ICombatRound[];
  currentRound?: ICombatRound;

  ended: boolean;

  begin(): void;
  end(context?: ICombatFinalizationSettings): ICombatSimulationResult | undefined;

  challenge(): boolean;
  canCombat(): boolean;

  createRound(): ICombatRound;
  beginRound(): void;
  applyRoundResults(round: ICombatRound): void;
  calculateResults(): ICombatSimulationResult;

  onBeforeRoundBegin: RoundEvent<ICombatRound>;
  onRoundBegin: RoundEvent<ICombatRound>;
  onRoundComplete: RoundEvent<ICombatRound>;
  onRoundTurn: TurnEvent<ICombatTurn>;
}
