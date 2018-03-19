import IFactionMemberEntity from '../entity/faction-member-entity.i';
import ICombatRound from './combat-round.i';
import ICombatTurn from './combat-turn.i';
import ICombatValidator from './combat-validator.i';

export default interface ICombatSimulationSettings {
  entities: IFactionMemberEntity[],
  turnResolver?: ICombatTurn,
  challengeResolver?: ICombatValidator,
  roundRequestValidator: ICombatValidator,
};