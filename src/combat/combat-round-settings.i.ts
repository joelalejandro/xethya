import IRoundSettings from '../interaction/round-settings.i';
import IFactionMemberEntity from '../entity/faction-member-entity.i';
import ICombatTurn from './combat-turn.i';
import IConstructable from '../utils/constructable.i';

export default interface ICombatRoundSettings extends IRoundSettings<ICombatTurn> {
  entities: IFactionMemberEntity[];
  roundNumber: number;
  turnType: IConstructable<ICombatTurn>;
};
