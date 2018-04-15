import IConstructableItem from './constructable-item.i';

export default class ItemFactory<T extends IConstructableItem<T>> {
  constructor(private constructorFunction: IConstructableItem<T>) {}

  create(itemSettings: object): T {
    return new this.constructorFunction(itemSettings);
  }
}
