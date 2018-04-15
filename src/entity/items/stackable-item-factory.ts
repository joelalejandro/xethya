import IConstructableStackableItem from './constructable-stackable-item.i';

export default class StackableItemFactory<T extends IConstructableStackableItem<T>> {
  constructor(private constructorFunction: IConstructableStackableItem<T>) {}

  create(itemSettings: object): T {
    return new this.constructorFunction(itemSettings);
  }
}
