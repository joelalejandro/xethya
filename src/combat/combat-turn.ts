import Turn from '../interaction/turn';
import ICombatTurn from './combat-turn.i';
import IFactionMemberEntity from '../entity/faction-member-entity.i';
import ICombatTurnSettings from './combat-turn-settings.i';

export default class CombatTurn extends Turn implements ICombatTurn {
  protected _validFoes: IFactionMemberEntity[];

  constructor(settings: ICombatTurnSettings) {
    super(settings);

    this._validFoes = settings.validFoes || [];  
  }

  get validFoes() {
    return this._validFoes;
  }

  set validFoes(newValue) {
    this._validFoes = newValue;
  }
}