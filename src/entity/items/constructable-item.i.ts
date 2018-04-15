import IItem from './item.i';
import IConstructable from '../../utils/constructable.t';

export default interface IConstructableItem<T extends IItem> extends IItem, IConstructable<T> {};
