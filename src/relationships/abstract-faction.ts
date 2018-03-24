import IFaction from './faction.i';
import IFactionSettings from './faction-settings.i';
import IFactionRelationship from './faction-relationship.i';
import { FactionRelationshipStatus } from './faction-relationship-status';
import { groupAndMap } from '../utils/group-by/group-by';
import IGrouping from '../utils/group-by/grouping.i';

export default abstract class AbstractFaction implements IFaction {
  protected _id: string;
  protected _name: string;
  protected _allRelationships: IFactionRelationship[];
  protected _relationshipsByStatus: IGrouping<IFaction>;

  constructor({ id, name }: IFactionSettings) {
    this._id = id;
    this._name = name;
    
    this._allRelationships = [];
    this._relationshipsByStatus = {}; 
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get allRelationships() {
    return this._allRelationships;
  }

  set allRelationships(value) {
    this._allRelationships = value;
    this._relationshipsByStatus = this.groupRelationshipsByStatus();
  }

  get relationshipsByStatus() {
    return this._relationshipsByStatus;
  }

  groupRelationshipsByStatus(): IGrouping<IFaction> {
    return groupAndMap<IFactionRelationship, IFaction>(
      this._allRelationships,
      (relation) => relation.relationshipStatus,
      (relation) => relation.faction
    );
  }

  getAlliedFactions() {
    return this._relationshipsByStatus[FactionRelationshipStatus.ALLY];
  }

  getNeutralFactions() {
    return this._relationshipsByStatus[FactionRelationshipStatus.NEUTRAL];
  }

  getEnemyFactions() {
    return this._relationshipsByStatus[FactionRelationshipStatus.ENEMY];
  }

  addRelationship(faction: IFaction, status: FactionRelationshipStatus): void {
    const relationship: IFactionRelationship = {
      faction,
      relationshipStatus: status,
    };

    this._allRelationships.push(relationship);
    this._relationshipsByStatus = this.groupRelationshipsByStatus();
  }

  addAlliedRelationship(faction: IFaction): void {
    this.addRelationship(faction, FactionRelationshipStatus.ALLY);
  }

  addNeutralRelationship(faction: IFaction): void {
    this.addRelationship(faction, FactionRelationshipStatus.NEUTRAL);
  }

  addEnemyRelationship(faction: IFaction): void {
    this.addRelationship(faction, FactionRelationshipStatus.ENEMY);
  }
}