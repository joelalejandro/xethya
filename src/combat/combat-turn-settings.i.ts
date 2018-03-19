import ITurnSettings from '../interaction/turn-settings.i';
import IFactionMemberEntity from '../entity/faction-member-entity.i';

export default interface ICombatTurnSettings extends ITurnSettings {
  validFoes?: IFactionMemberEntity[];
}