import Collection from '../../utils/collection/collection';
import { Attribute } from './attribute';

export default class AttributeCollection extends Collection<Attribute> {
  constructor() {
    super('id');
  }

  add(...attributes: Attribute[]) {
    attributes.forEach(this._bindAttributeEvents.bind(this));
    super.add(...attributes);
  }

  remove(id: string): void {
    this._unbindAttributeEvents(id);
    super.remove(id);
  }

  removeAll(): void {
    this.getAll().forEach(attribute => this.remove(attribute.id));    
  }

  setValue(id: string, value: number): void {
    if (this.contains(id)) {
      const attribute = this.get(id) as Attribute;
      attribute.rawValue = value;
    }
  }

  getModifierSumForAll() {
    if (this.count === 0) {
      return 0;
    }
    
    return this.getAll()
      .map(attribute => attribute.modifiers.getSum())
      .reduce((leftSum, rightSum) => leftSum + rightSum);
  }
  
  private _bindAttributeEvents(attribute: Attribute): void {
    attribute.on('change:value', (...args) => {
      this.emit('change:attribute:value', ...args);
      this.emit(`change:attribute:${attribute.id}:value`, ...args);
    });  
  }

  private _unbindAttributeEvents(id: string): void {
    this.off(`change:attribute:${id}:value`);    
  }

  static fromArray(attributes: Attribute[]) : AttributeCollection {
    const collection: AttributeCollection = new AttributeCollection();

    collection.add(...attributes);

    return collection;
  }
}