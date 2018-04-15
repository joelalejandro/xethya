import IStackableItem from './stackable-item.i';
import IConstructable from '../../utils/constructable.t';

export default interface IConstructableStackableItem<T extends IStackableItem>
  extends IStackableItem, IConstructable<T> {};
