import ICombatTurn from './combat-turn.i';
import IRound from '../interaction/round.i';
import IEntity from '../entity/entity.i';
import IFactionMemberEntity from '../entity/faction-member-entity.i';
import ICombatRoundSettings from './combat-round-settings.i';
import CombatTurn from './combat-turn';
import ICombatRound from './combat-round.i';
import Round from '../interaction/round';
import IFaction from '../relationships/faction.i';
import IGrouping from '../utils/group-by/grouping.i';
import { group } from '../utils/group-by/group-by';
import IConstructable from '../utils/constructable.i';

export default class CombatRound extends Round<ICombatTurn> implements ICombatRound<ICombatTurn, IFactionMemberEntity> {
  protected _turnType: IConstructable<ICombatTurn>;
  protected _turns: ICombatTurn[];
  protected _entities: IFactionMemberEntity[];
  protected _entitiesByFaction: IGrouping<IFactionMemberEntity>;
  protected _currentTurn?: ICombatTurn;

  constructor({ entities, roundNumber, turnType }: ICombatRoundSettings) {
    super({ entities, roundNumber, turnType });

    this._turnType = turnType;
    this._entities = entities;
    this._turns = [];

    this._entitiesByFaction = group<IFactionMemberEntity>(
      entities,
      (entity) => entity.faction.id
    );
  }

  get turnType() {
    return this._turnType;
  }

  get turns() {
    return this._turns;
  }

  get entities() {
    return this._entities;
  }

  get currentTurn() {
    return this._currentTurn;
  }

  buildTurnFor(entity: IFactionMemberEntity, turnNumber: number): CombatTurn {
    const turn = super.buildTurnFor(entity, turnNumber) as CombatTurn;

    turn.validFoes = this.getValidFoesFor(entity);

    return turn;
  }

  getValidFoesFor(entity: IFactionMemberEntity): IFactionMemberEntity[] {
    const foes: IFactionMemberEntity[] = [];

    const { faction } = entity;
    const enemies: IFaction[] = faction.getEnemyFactions() || [];
    const neutrals: IFaction[] = faction.getNeutralFactions() || [];
    const factions: IFaction[] = enemies.concat(neutrals);

    factions.forEach((faction) => {
      foes.push(...this._entitiesByFaction[faction.id]);
    });

    return foes;
  }
}
