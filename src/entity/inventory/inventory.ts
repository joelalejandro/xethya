import IInventory from './inventory.i';
import Collection from '../../utils/collection/collection';
import Item from '../items/item';
import ItemStack from '../items/item-stack';
import IStackableItem from '../items/stackable-item.i';
import IInventorySettings from './inventory-settings.i';
import IEntity from '../entity.i';
import IStorable from './storable.i';
import bySum from '../../utils/reducers/by-sum';
import byKey from '../../utils/mappers/by-key';

export default class Inventory extends Collection<IStorable> implements IInventory {
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

  protected _calculateWeight(collection: Collection<IStorable> = this): number {
    return collection.getAll().map(byKey('weight')).reduce(bySum, 0);
  }

  get count(): number {
    return this._calculateWeight();
  }

  add(...items: IStorable[]): void {
    const itemsToAdd = Collection.fromArrayOf<IStorable>(items, 'id');
    const amountOfItemsToAdd = this._calculateWeight(itemsToAdd);

    if (amountOfItemsToAdd + this.count > this.maximumCapacity) {
      throw new Error('Inventory#add: cannot add all items, would exceed capacity');
    }

    super.add(...items);
  }
}
