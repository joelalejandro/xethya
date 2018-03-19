import ICombatTurn from './combat-turn.i';
import IConstructable from '../utils/constructable.t';

export default interface IConstructableCombatTurn<T> extends ICombatTurn, IConstructable<T> {};