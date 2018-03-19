import IRoundSettings from '../interaction/round-settings.i';
import IFactionMemberEntity from '../entity/faction-member-entity.i';
import ICombatTurn from './combat-turn.i';

export default interface ICombatRoundSettings extends IRoundSettings {
  entities: IFactionMemberEntity[];
  roundNumber: number;
  turnType: ICombatTurn;
};