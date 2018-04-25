import IItemStack from './item-stack.i';
import XethyaObject from '../../base/object';
import IStackableItem from './stackable-item.i';
import Price from '../../economy/price';
import StackableItem from './stackable-item';
import Factory from '../../utils/factory';
import IConstructable from '../../utils/constructable.i';

export default class ItemStack<T extends IStackableItem> extends XethyaObject implements IItemStack<T> {
  protected _amount: number = 1;
  protected readonly _id: string;
  protected readonly _capacity: number;
  protected readonly _item: IConstructable<T>;
  protected readonly _baseValue: Price;
  protected _weight: number = 0;
  protected _itemEntity: T;

  constructor(item: IConstructable<T>, amount: number = 1) {
    super();

    this._item = item;

    this._itemEntity = Factory.create(this._item);

    this._id = `stack:${this._itemEntity.id}`;
    this._baseValue = this._itemEntity.baseValue as Price;
    this._capacity = this._itemEntity.maxAmountInStack;

    this.amount = amount;
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
    this._weight = this._itemEntity.weight * newAmount;
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

  get weight(): number {
    return this._weight;
  }

  push() {
    this.amount += 1;
  }

  pop(): T {
    this.amount -= 1;
    return this._itemEntity;
  }
}
