import IFaction from './faction.i';
import FactionRelationshipStatus from './faction-relationship-status';

export default interface IFactionRelationship {
  faction: IFaction;
  relationshipStatus: FactionRelationshipStatus;
}