import 'mocha';
import chai from 'chai';
import spies from 'chai-spies';

chai.use(spies);
const expect = chai.expect;

import AttributeCollection from './attribute-collection';
import { Attribute } from './attribute';
import Collection from '../../utils/collection/collection';

class FooAttribute extends Attribute {
  constructor() {
    super({ id: 'foo', initialValue: 10 });
  }
}

class BarAttribute extends Attribute {
  constructor() {
    super({ id: 'bar', initialValue: 5 });
  }
}

const doNothing = () => {};

let collection: AttributeCollection;

describe('Entity.AttributeCollection', () => {
  beforeEach(() => {
    collection = new AttributeCollection();
  });
  it('should use `id` as key', () => {
    expect(collection.indexName).to.equal('id');
  });
  describe('#add', () => {
    it('should add as Collection<T> does', () => {
      collection.add(new FooAttribute());
      expect(collection.count).to.equal(1);
    });
    describe('should trigger collection-level events', () => {
      let attribute: FooAttribute;
      let otherAttribute: BarAttribute;
      beforeEach(() => {
        attribute = new FooAttribute();
        otherAttribute = new BarAttribute();
        collection.add(attribute, otherAttribute);
      });
      it('change:attribute:value', (done) => {
        collection.once('change:attribute:value', (affectedAttribute: FooAttribute) => {
          expect(affectedAttribute.rawValue).to.equal(5);
          done();
        });
        attribute.rawValue = 5;
      });
      it('change:attribute:foo:value', (done) => {
        collection.once('change:attribute:foo:value', (affectedAttribute: FooAttribute) => {
          expect(affectedAttribute.rawValue).to.equal(5);
          expect(affectedAttribute.id).to.not.equal(otherAttribute.id);
          done();
        });
        attribute.rawValue = 5;
      });
    });
  });
  describe('#remove', () => {
    beforeEach(() => {
      collection.add(new FooAttribute(), new BarAttribute());
      collection.once('change:attribute:foo:value', doNothing);
      collection.once('change:attribute:bar:value', doNothing);
    });
    it('should remove as Collection<T> does', () => {
      collection.remove('foo');
      expect(collection.contains('foo')).to.be.false;
    });
    describe('should remove collection-level listeners', () => {
      let eventNames: string[];
      beforeEach(() => {
        collection.remove('foo');
        eventNames = collection.eventNames() as string[];
      });
      it('change:attribute:foo:value', () => {
        expect(eventNames).not.to.contain('change:attribute:foo:value');
        expect(eventNames).to.contain('change:attribute:bar:value');
      });
    });
  });
  describe('#removeAll', () => {
    beforeEach(() => {
      collection.add(new FooAttribute(), new BarAttribute());
      collection.once('change:attribute:foo:value', doNothing);
      collection.once('change:attribute:bar:value', doNothing);
    });
    it('should clear everything using #remove', () => {
      const spyRemove = chai.spy.on(collection, 'remove');
      collection.removeAll();

      const eventListeners: string[] = collection.eventNames() as string[]

      expect(eventListeners.filter(
        (eventName: string) => /foo/.test(eventName)
      )).to.be.empty;

      expect(eventListeners.filter(
        (eventName: string) => /bar/.test(eventName)
      )).to.be.empty;

      expect(spyRemove).to.have.been.called.twice;
      expect(collection.count).to.equal(0);
    });
  });
  describe('#setValue', () => {
    beforeEach(() => {
      collection.add(new FooAttribute());
    });
    it('should set the value for an existing modifier', () => {
      collection.setValue('foo', 20);
      const foo = collection.get('foo') as FooAttribute;
      expect(foo.rawValue).to.equal(20);
    });
    it('should do nothing for a non-existing modifier', () => {
      collection.setValue('lol', 20);
      const lol = collection.get('lol') as Attribute;
      expect(lol).to.equal(undefined);
    });
  });
  describe('#getModifierSumForAll', () => {
    beforeEach(() => {
      collection.add(new FooAttribute(), new BarAttribute());
    });
    it('should sum the value of all the modifiers', () => {
      const foo = collection.get('foo') as FooAttribute;
      const bar = collection.get('bar') as BarAttribute;
      expect(collection.getModifierSumForAll()).to.equal(foo.modifiers.getSum() + bar.modifiers.getSum());
    });
    it('should return 0 if no modifiers are in the collection', () => {
      collection.removeAll();
      expect(collection.getModifierSumForAll()).to.equal(0);
    });
  });
  it('should create a collection based on Attribute[]', () => {
    const collection = AttributeCollection.fromArray([new FooAttribute(), new BarAttribute()]);
    expect(collection.contains('foo')).to.be.true;
    expect(collection.contains('bar')).to.be.true;
  });    
});