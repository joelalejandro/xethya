import Stat from './stat';
import Collection from '../../utils/collection/collection';

export default class StatCollection extends Collection<Stat> {
  constructor() {
    super('id');
  }

  add(...stats: Stat[]) {
    stats.forEach(stat => this._bindStatEvents.bind(this));
    super.add(...stats);
  }

  remove(id: string): void {
    this._unbindStatEvents(id);
    super.remove(id);
  }
  
  removeAll(): void {
    this.getAll().forEach(stat => this.remove(stat.id));    
  }

  // TODO: This event isn't working, probably to the weird
  // nature of `stat.value` emitting an event if its value
  // changes.
  private _bindStatEvents(stat: Stat): void {
    stat.on('change:value', (...args) => {
      this.emit('change:stat:value', ...args);
      this.emit(`change:stat:${stat.id}:value`, ...args);
    });  
  }

  private _unbindStatEvents(id: string): void {
    this.off(`change:stat:${id}:value`);
  }

  static fromArray(stats: Stat[]) : StatCollection {
    const collection: StatCollection = new StatCollection();

    collection.add(...stats);

    return collection;
  }
}