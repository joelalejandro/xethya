import XethyaObject from '../base/object';
import ICombatSimulation from './combat-simulation.i';
import IFactionMemberEntity from '../entity/faction-member-entity.i';
import ICombatSimulationSettings from './combat-simulation-settings.i';
import ICombatValidator from './combat-validator.i';
import ICombatTurn from './combat-turn.i';
import ICombatRound from './combat-round.i';
import CombatTurn from './combat-turn';
import IGrouping from '../utils/group-by/grouping.i';
import { group } from '../utils/group-by/group-by';
import CombatRound from './combat-round';
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
  protected _ended: boolean = false;

  constructor({
    entities,
    roundRequestValidator,
    turnResolver = CombatTurn,
    challengeResolver = () => true,
  }: ICombatSimulationSettings) {
    super();

    this._entities = entities;
    this._rounds = [];
    this._turnResolver = turnResolver as ICombatTurn;
    this._challengeResolver = challengeResolver;
    this._roundRequestValidator = roundRequestValidator;
  }

  get entities() {
    return this._entities;
  }

  get turnResolver() {
    return this._turnResolver;
  }

  get challengeResolver() {
    return this._challengeResolver;
  }

  get roundRequestValidator() {
    return this._roundRequestValidator;
  }

  get rounds() {
    return this._rounds;
  }

  get ended() {
    return this._ended;
  }

  get currentRound() {
    return this._currentRound;
  }

  challenge(): boolean {
    return this.challengeResolver.call(null, this);
  }

  begin(): void {
    if (!this.challenge()) {
      this.end({ avoided: true });
      return;
    }

    if (this._ended) {
      return;
    }

    this.emit('before:combat');
    this.beginRound();
  }

  canCombat(): boolean {
    return this.roundRequestValidator.call(null, this);
  }

  createRound(): ICombatRound {
    const round = new CombatRound({
      entities: this._entities,
      roundNumber: this._rounds.length + 1,
      turnType: this.turnResolver,
    });

    round.on('before:begin', this.onBeforeRoundBegin.bind(this));
    round.on('begin', this.onRoundBegin.bind(this));
    round.on('complete', this.onRoundComplete.bind(this));
    round.on('turn', this.onRoundTurn.bind(this));

    return round;
  }

  onBeforeRoundBegin({ round }: IRoundEvent<ICombatRound>): void {
    this.emit('before:begin:round', { round });
  }

  onRoundBegin({ round }: IRoundEvent<ICombatRound>): void {
    this.emit('begin:round', { round });
  }

  onRoundComplete({ round }: IRoundEvent<ICombatRound>): void {
    this.emit('after:round', { round });
    this.applyRoundResults(round);
  }

  onRoundTurn({ turn }: ITurnEvent<ICombatTurn>): void {
    this.emit('turn:round', { turn });
  }
  
  applyRoundResults(round: ICombatRound): void {
    this._rounds.push(round);
    this.beginRound();
  }

  beginRound(): void {
    if (!this.canCombat()) {
      this.end();
      return;
    }

    const round: ICombatRound = this.createRound();

    round.begin();

    this._currentRound = round;
  }

  calculateResults(): ICombatSimulationResult {
    return {
      avoided: false,
    };
  }

  end(context?: ICombatFinalizationSettings): ICombatSimulationResult | undefined {
    this._ended = true;

    if (context && context.avoided) {
      this.emit('end', { avoided: context.avoided });
      return;
    }

    const results = this.calculateResults();

    this.emit('end', { results });

    return results;
  }
}