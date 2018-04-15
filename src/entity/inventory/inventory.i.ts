import IItem from '../items/item.i';
import IItemStack from '../items/item-stack.i';
import Collection from '../../utils/collection/collection';
import IOwned from '../owned.i';
import IStackableItem from '../items/stackable-item.i';
import ICollection from '../../utils/collection/collection.i';

export default interface IInventory extends IOwned, ICollection<(IItem | IItemStack<IStackableItem>)> {
  maximumCapacity: number;
}
