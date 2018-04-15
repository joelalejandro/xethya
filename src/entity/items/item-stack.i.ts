import IConstructableStackableItem from './constructable-stackable-item.i';
import IStackableItem from './stackable-item.i';
import IPrice from '../../economy/price.i';
import StackableItemFactory from './stackable-item-factory';

export default interface IItemStack<T extends IConstructableStackableItem<T>> {
  readonly id: string;
  readonly item: StackableItemFactory<T>;
  readonly capacity: number;
  readonly baseValue: IPrice;

  amount: number;

  push(): void;
  pop(): T;
}
