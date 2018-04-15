import IStackableItem from "./stackable-item.i";
import Item from "./item";
import IStackableItemSettings from "./stackable-item-settings.i";
import IItemSettings from "./item-settings.i";

export default class StackableItem extends Item implements IStackableItem {
  protected readonly _maxAmountInStack: number = 1;

  constructor(settings: IStackableItemSettings) {
    super(settings as IItemSettings);

    this._maxAmountInStack = settings.maxAmountInStack;
  }

  get maxAmountInStack() {
    return this._maxAmountInStack;
  }
}
