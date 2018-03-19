import IFactionRelationship from './faction-relationship.i';
import IGrouping from '../utils/group-by/grouping.i';
import { FactionRelationshipStatus } from './faction-relationship-status';

export default interface IFaction {
  id: string;
  name: string;
  allRelationships: IFactionRelationship[];
  readonly relationshipsByStatus: IGrouping<IFaction>;

  getAlliedFactions(): IFaction[];
  getEnemyFactions(): IFaction[];
  getNeutralFactions(): IFaction[];

  groupRelationshipsByStatus(): IGrouping<IFaction>;

  addRelationship(faction: IFaction, status: FactionRelationshipStatus): void;
}