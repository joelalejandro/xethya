import IItemStack from './item-stack.i';
import XethyaObject from '../../base/object';
import IStackableItem from './stackable-item.i';
import IConstructableStackableItem from './constructable-stackable-item.i';
import Price from '../../economy/price';
import StackableItem from './stackable-item';
import StackableItemFactory from './stackable-item-factory';

export default class ItemStack<T extends IConstructableStackableItem<T>> extends XethyaObject implements IItemStack<T> {
  protected _amount: number;
  protected readonly _id: string;
  protected readonly _capacity: number;
  protected readonly _item: StackableItemFactory<T>;
  protected readonly _baseValue: Price;

  constructor(item: T, amount: number = 1) {
    super();

    this._amount = amount;
    this._item = new StackableItemFactory<T>(item);

    const itemEntity = this._item.create({});

    this._id = `stack:${itemEntity.id}`;
    this._baseValue = itemEntity.baseValue as Price;
    this._capacity = itemEntity.maxAmountInStack;
  }

  get id() {
    return this._id;
  }

  get amount() {
    return this._amount;
  }

  set amount(newAmount: number) {
    if (newAmount > this._capacity) {
      throw new Error(`ItemStack#set(amount): cannot exceed ${this._capacity}, attempted to set ${newAmount}`);
    }

    if (newAmount < 0) {
      throw new Error('ItemStack#set(amount): cannot be less than zero');
    }

    if (newAmount === 0) {
      this.emit('destroy');
    }

    this._amount = newAmount;
  }

  get capacity() {
    return this._capacity;
  }

  get item() {
    return this._item;
  }

  get baseValue(): Price {
    return this._baseValue.multipliedBy(this._amount);
  }

  push() {
    this._amount += 1;
  }

  pop(): T {
    this._amount -= 1;
    return new this._item();
  }
}
