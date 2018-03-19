import ITurn from '../interaction/turn.i';
import IFactionMemberEntity from '../entity/faction-member-entity.i';

export default interface ICombatTurn extends ITurn {
  validFoes: IFactionMemberEntity[];
}