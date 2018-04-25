import IItem from './item.i';

export default interface IStackableItem extends IItem {
  readonly maxAmountInStack: number;
}
