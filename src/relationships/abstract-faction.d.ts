import IFaction from './faction.i';
import IFactionSettings from './faction-settings.i';
import IFactionRelationship from './faction-relationship.i';
import { FactionRelationshipStatus } from './faction-relationship-status';
import IGrouping from '../utils/group-by/grouping.i';
export default abstract class AbstractFaction implements IFaction {
    protected _id: string;
    protected _name: string;
    protected _allRelationships: IFactionRelationship[];
    protected _relationshipsByStatus: IGrouping<IFaction>;
    constructor({id, name}: IFactionSettings);
    readonly id: string;
    readonly name: string;
    allRelationships: IFactionRelationship[];
    readonly relationshipsByStatus: IGrouping<IFaction>;
    groupRelationshipsByStatus(): IGrouping<IFaction>;
    getAlliedFactions(): IFaction[];
    getNeutralFactions(): IFaction[];
    getEnemyFactions(): IFaction[];
    addRelationship(faction: IFaction, status: FactionRelationshipStatus): void;
    addAlliedRelationship(faction: IFaction): void;
    addNeutralRelationship(faction: IFaction): void;
    addEnemyRelationship(faction: IFaction): void;
}
