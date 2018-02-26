import IIndexedByString from './indexed-by-string.i';
import Eventable from '../../base/eventable';
import ICollection from './collection.i';
import IQuery from './query.i';
import assert from '../assert/assert';

abstract class AbstractCollection<T extends {[index: string]: any}> extends Eventable implements ICollection<T> {
  public indexName: string;
  protected _list: IIndexedByString<T> = {};

  constructor(indexName: string) {
    super();

    this.indexName = indexName;
  }

  get count(): number {
    return Object.keys(this._list).length;
  }

  get(id: string): T | undefined {
    return this._list[id];
  }

  getAll(): T[] {
    return Object.keys(this._list).map((id: string) => this._list[id]);
  }

  where(condition: IQuery<T>): T[] {
    return this.getAll().filter(condition);
  }

  contains(id: string): boolean {
    return id in this._list;
  }

  add(...items: T[]): void {
    this.emit('before:add', this, ...items);

    items.forEach((item: T) => {
      const index = item[this.indexName];
      assert(!this.contains(index), `An item already exists with key: ${index}`);

      this._list[index] = item;
    });

    this.emit('add', this);
  }

  remove(id: string): void {
    if (this.contains(id)) {
      this.emit('before:remove', this);

      delete this._list[id];

      this.emit('remove');
    }
  }

  removeAll(): void {
    this.emit('before:removeAll', this);

    this._list = {};

    this.emit('removeAll', this);
  }
}

export default AbstractCollection;