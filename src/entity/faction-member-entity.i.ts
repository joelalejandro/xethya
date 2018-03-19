import IFaction from '../relationships/faction.i';
import IEntity from './entity.i';

export default interface IFactionMemberEntity extends IEntity {
  faction: IFaction;
}