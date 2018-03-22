import 'mocha';
import { expect } from 'chai';

import AbstractCollection from './abstract-collection';

class MyItem {
  key: string;
  name: string;

  constructor(key: string, name: string) {
    this.key = key;
    this.name = name;
  }
}

class MyCollection extends AbstractCollection<MyItem> {
  constructor() {
    super('key');
  }
}

const itemList: MyItem[] = [new MyItem('1', 'a'), new MyItem('2', 'b')];

let collection: MyCollection;

describe('Utils.AbstractCollection', () => {
  beforeEach(() => {
    collection = new MyCollection();
  });
  it('should instantiate the collection', () => {
    expect(collection.indexName).to.equal('key');
  });
  describe('#add', () => {
    it('should add an item', () => {
      expect(collection.count).to.equal(0); 
      collection.add(new MyItem('123', 'An item'));
      expect(collection.count).to.equal(1); 
    });
    it('should add multiple items', () => {
      expect(collection.count).to.equal(0); 
      collection.add(new MyItem('123', 'An item'));
      collection.add(new MyItem('124', 'An item 2'));
      collection.add(new MyItem('125', 'An item 3'));
      collection.add(new MyItem('126', 'An item 4'));
      expect(collection.count).to.equal(4); 
    });
    it('should throw an error when adding items with a duplicate key', () => {
      collection.add(new MyItem('123', 'An item'));
      expect(() => {
        collection.add(new MyItem('123', 'An item 2'));    
      }).to.throw(/item already exists/);
    });
    it('should trigger `before:add` when adding items', (done) => {
      collection.once('before:add', (affectedCollection, ...items: MyItem[]) => {
        expect(items).to.deep.equal(itemList);
        done();
      });
      collection.add(...itemList);
    });
    it('should trigger `add` after adding items', (done) => {
      collection.once('add', (affectedCollection: MyCollection) => {
        expect(affectedCollection.count).to.equal(2);
        done();
      });
      collection.add(...itemList);
    });
  });
  describe('#remove', () => {
    beforeEach(() => {
      collection.add(...itemList);
    });
    it('should remove an item by its key', () => {
      collection.remove('1');
      expect(collection.contains('1')).to.be.false;
      expect(collection.count).to.equal(itemList.length - 1);
    });
    it('should do nothing if trying to remove a non-existing key', () => {
      collection.remove('key');
      expect(collection.count).to.equal(itemList.length);
    });
    it('should trigger `before:remove` when removing an item', (done) => {
      collection.once('before:remove', (affectedCollection: MyCollection) => {
        expect(collection.contains('1')).to.be.true;
        expect(collection.count).to.equal(itemList.length);
        done();
      });
      collection.remove('1');
    });
    it('should trigger `remove` after removing an item', (done) => {
      collection.once('remove', (affectedCollection: MyCollection) => {
        expect(collection.contains('1')).to.be.false;
        expect(collection.count).to.equal(itemList.length - 1);
        done();
      });
      collection.remove('1');
    });
  });
  describe('#removeAll', () => {
    beforeEach(() => {
      collection.add(...itemList);
    });
    it('should clear the list when executing removeAll()', () => {
      collection.removeAll();
      expect(collection.contains('1')).to.be.false;
      expect(collection.contains('2')).to.be.false;
      expect(collection.count).to.equal(0);
    });
    it('should trigger `before:removeAll` when clearing', (done) => {
      collection.once('before:removeAll', (affectedCollection: MyCollection) => {
        expect(collection.contains('1')).to.be.true;
        expect(collection.contains('2')).to.be.true;
        expect(collection.count).to.equal(2);          
        done();
      });
      collection.removeAll();
    });
    it('should trigger `removeAll` when clearing', (done) => {
      collection.once('removeAll', (affectedCollection: MyCollection) => {
        expect(collection.contains('1')).to.be.false;
        expect(collection.contains('2')).to.be.false;
        expect(collection.count).to.equal(0);
        done();
      });
      collection.removeAll();
    });
  });
  describe('#get', () => {
    beforeEach(() => {
      collection.add(...itemList);
    });
    it('should get an item by its key', () => {
      expect(collection.get('1')).to.deep.equal(itemList[0]);
      expect(collection.get('2')).to.deep.equal(itemList[1]);
    });
    it('should return undefined for a non-existing key', () => {
      expect(collection.get('foo')).to.equal(undefined);
    });
  });
  describe('#getAll', () => {
    beforeEach(() => {
      collection.add(...itemList);
    });
    it('should get all the collection as an array of T', () => {
      const myItems: MyItem[] = collection.getAll();
      expect(myItems).to.deep.equal(itemList);
    });
    it('should return an empty array if the list is empty', () => {
      collection.removeAll();
      expect(collection.getAll()).to.deep.equal([]);
    });
  });
  describe('#getAllKeys', () => {
    beforeEach(() => {
      collection.add(...itemList);
    });
    it('should return all keys in the collection', () => {
      expect(collection.getAllKeys()).to.deep.equal(['1', '2']);
    });
  });
  describe('#where', () => {
    beforeEach(() => {
      collection.add(...itemList);
    });
    it('should return matches for a fulfilled condition', () => {
      const isEven = (item: MyItem) => Number(item.key) % 2 === 0;
      const evenKeys = collection.where(isEven);

      expect(evenKeys.length).to.equal(1);
      expect(evenKeys[0].key).to.equal('2');
    });
    it('should return an empty array for a non-fulfilled condition', () => {
      const isC = (item: MyItem) =>item.key === 'C';
      const evenKeys = collection.where(isC);

      expect(evenKeys.length).to.equal(0);
    });
  });
});