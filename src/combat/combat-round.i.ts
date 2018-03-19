import IRound from '../interaction/round.i';
import ICombatTurn from './combat-turn.i';
import IFactionMemberEntity from '../entity/faction-member-entity.i';

export default interface ICombatRound<T = ICombatTurn, E = IFactionMemberEntity> extends IRound<T, E> {
  getValidFoesFor(entity: E): E[];
}