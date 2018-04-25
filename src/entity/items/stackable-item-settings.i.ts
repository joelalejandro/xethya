import IItemSettings from './item-settings.i';

export default interface IStackableItemSettings extends IItemSettings {
  maxAmountInStack: number;
}
