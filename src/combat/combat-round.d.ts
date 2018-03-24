import ICombatTurn from './combat-turn.i';
import IFactionMemberEntity from '../entity/faction-member-entity.i';
import ICombatRoundSettings from './combat-round-settings.i';
import CombatTurn from './combat-turn';
import ICombatRound from './combat-round.i';
import Round from '../interaction/round';
import IGrouping from '../utils/group-by/grouping.i';
export default class CombatRound extends Round implements ICombatRound<ICombatTurn, IFactionMemberEntity> {
    protected _turnType: ICombatTurn;
    protected _turns: ICombatTurn[];
    protected _entities: IFactionMemberEntity[];
    protected _entitiesByFaction: IGrouping<IFactionMemberEntity>;
    protected _currentTurn?: ICombatTurn;
    constructor({entities, roundNumber, turnType}: ICombatRoundSettings);
    readonly turnType: ICombatTurn;
    readonly turns: ICombatTurn[];
    readonly entities: IFactionMemberEntity[];
    readonly currentTurn: ICombatTurn | undefined;
    buildTurnFor(entity: IFactionMemberEntity, turnNumber: number): CombatTurn;
    getValidFoesFor(entity: IFactionMemberEntity): IFactionMemberEntity[];
}
