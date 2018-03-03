import Collection from '../../utils/collection/collection';
import Modifier from './modifier';

export default class ModifierCollection extends Collection<Modifier> {
  constructor() {
    super('id');
  }

  add(...modifiers: Modifier[]) {
    modifiers.forEach(this._bindModifierEvents.bind(this));
    super.add(...modifiers);
  }

  remove(id: string): void {
    this._unbindModifierEvents(id);
    super.remove(id);
  }

  removeAll(): void {
    this.getAll().forEach(modifier => this.remove(modifier.id));
  }

  setValue(id: string, value: number): void {
    if (this.contains(id)) {
      const modifier = this.get(id) as Modifier;
      modifier.value = value;
    }
  }

  activate(id: string): void {
    if (this.contains(id)) {
      const modifier = this.get(id) as Modifier;
      modifier.active = true;
    }    
  }

  deactivate(id: string): void {
    if (this.contains(id)) {
      const modifier = this.get(id) as Modifier;
      modifier.active = false;
    }    
  }

  getSum(): number {
    if (this.count === 0) {
      return 0;
    }

    return this.where(modifier => modifier.active)
      .map(modifier => modifier.value)
      .reduce((leftValue, rightValue) => leftValue + rightValue);
  }

  private _bindModifierEvents(modifier: Modifier): void {
    modifier.on('change:value', (...args) => {
      this.emit('change:modifier:value', ...args);
      this.emit(`change:modifier:${modifier.id}:value`, ...args);
    });      

    modifier.on('change:active', (...args) => {
      this.emit('change:modifier:active', ...args);
      this.emit(`change:modifier:${modifier.id}:active`, ...args);
    });

    modifier.on('activate', (...args) => {
      this.emit('activate:modifier', ...args);
      this.emit(`activate:modifier:${modifier.id}`, ...args);
    });

    modifier.on('deactivate', (...args) => {
      this.emit('deactivate:modifier', ...args);
      this.emit(`deactivate:modifier:${modifier.id}`, ...args);
    });  
  }

  private _unbindModifierEvents(id: string): void {
    this.off(`change:modifier:${id}:value`);
    this.off(`change:modifier:${id}:active`);
    this.off(`activate:modifier:${id}`);
    this.off(`deactivate:modifier:${id}`);
  }

  static fromArray(modifiers: Modifier[]) : ModifierCollection {
    const collection: ModifierCollection = new ModifierCollection();

    collection.add(...modifiers);

    return collection;
  }  
}