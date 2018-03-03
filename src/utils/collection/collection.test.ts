import 'mocha';
import { expect } from 'chai';

import Collection from './collection';

class MyItem {
  key: string;
  name: string;

  constructor(key: string, name: string) {
    this.key = key;
    this.name = name;
  }
}

describe('Utils.Collection', () => {
  it('should pass indexName to AbstractCollection', () => {
    const collection = new Collection<MyItem>('key');
    expect(collection.indexName).to.equal('key');
  });

  it('should create a collection based on T[]', () => {
    let collection: Collection<MyItem>;
    collection = Collection.fromArrayOf<MyItem>(
      [new MyItem('a', 'Alpha'),
       new MyItem('b', 'Beta')],
      'key'
    );
    expect(collection.indexName).to.equal('key');
    expect(collection.count).to.equal(2);
  });
});