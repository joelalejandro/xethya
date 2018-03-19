import ITurn from './turn.i';
import IConstructable from '../utils/constructable.t';

export default interface IConstructableTurn<T> extends ITurn, IConstructable<T> {};