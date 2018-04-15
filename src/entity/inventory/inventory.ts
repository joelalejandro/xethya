import IInventory from './inventory.i';
import Collection from '../../utils/collection/collection';
import Item from '../items/item';
import ItemStack from '../items/item-stack';
import IStackableItem from '../items/stackable-item.i';
import IInventorySettings from './inventory-settings.i';
import IEntity from '../entity.i';

export default class Inventory extends Collection<(Item | ItemStack<IStackableItem>)> implements IInventory {
  protected _maximumCapacity: number;
  protected _owner: IEntity;

  constructor({
    maximumCapacity,
    owner
  }: IInventorySettings) {
    super('id');

    this._maximumCapacity = maximumCapacity;
    this._owner = owner;
  }

  get maximumCapacity() {
    return this._maximumCapacity;
  }

  get owner() {
    return this._owner;
  }

  protected _countItemsAndStackedItems(collection: Collection<(Item | ItemStack<IStackableItem>)> = this): number {
    const stacks = collection.where(item => item.id.startsWith('stack:')) as ItemStack<IStackableItem>[];
    const stackedItems: number = stacks.map(item => item.amount).reduce((left, right) => left + right);
    const items = super.count - stacks.length;

    return items + stackedItems;
  }

  get count(): number {
    return this._countItemsAndStackedItems();
  }

  add(...items: (Item | ItemStack<IStackableItem>)[]): void {
    const itemsToAdd = Collection.fromArrayOf<(Item | ItemStack<IStackableItem>)>(items, 'id');
    const amountofItemsToAdd = this._countItemsAndStackedItems(itemsToAdd);

    if (amountofItemsToAdd + this.count > this.maximumCapacity) {
      throw new Error('Inventory#add: cannot add all items, would exceed capacity');
    }

    super.add(...items);
  }
}
