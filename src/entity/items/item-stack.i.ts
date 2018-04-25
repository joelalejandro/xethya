import IStackableItem from './stackable-item.i';
import IPrice from '../../economy/price.i';
import IStorable from '../inventory/storable.i';
import IConstructable from '../../utils/constructable.i';

export default interface IItemStack<T extends IStackableItem> extends IStorable {
  readonly item: IConstructable<T>;
  readonly capacity: number;
  readonly baseValue: IPrice;

  amount: number;

  push(): void;
  pop(): T;
}
