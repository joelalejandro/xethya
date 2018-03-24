import { AbleEntity, IAbleEntitySettings } from './able-entity';
import { Race } from './race/race';
import Stat from './stats/stat';
import StatCollection from './stats/stat-collection';
import IHasStats from './stats/has-stats.i';
import IFaction from '../relationships/faction.i';
import IFactionMemberEntity from './faction-member-entity.i';
export interface ILivingEntitySettings extends IAbleEntitySettings {
    race: Race;
    age: number;
    height: number;
    weight: number;
    stats: Stat[];
    faction: IFaction;
}
export declare class LivingEntity extends AbleEntity implements IHasStats, IFactionMemberEntity {
    protected _race: Race;
    protected _age: number;
    protected _height: number;
    protected _weight: number;
    protected _stats: StatCollection;
    protected _faction: IFaction;
    constructor(settings: ILivingEntitySettings);
    readonly stats: StatCollection;
    readonly race: Race;
    readonly age: number;
    readonly height: number;
    readonly weight: number;
    readonly faction: IFaction;
    protected _applyRacialTraits(): void;
    protected _applyRaceAttributes(): void;
    protected _applyRaceStats(): void;
    protected _applyRaceSkills(): void;
}
