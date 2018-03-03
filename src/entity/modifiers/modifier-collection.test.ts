import 'mocha';
import chai from 'chai';
import spies from 'chai-spies';

chai.use(spies);
const expect = chai.expect;

import ModifierCollection from './modifier-collection';
import Modifier from './modifier';
import Collection from '../../utils/collection/collection';

class FooModifier extends Modifier {
  constructor() {
    super('foo', 10);
  }
}

class BarModifier extends Modifier {
  constructor() {
    super('bar', 5);
  }
}

const doNothing = () => {};

let collection: ModifierCollection;

describe('Entity.ModifierCollection', () => {
  beforeEach(() => {
    collection = new ModifierCollection();
  });
  it('should use `id` as key', () => {
    expect(collection.indexName).to.equal('id');
  });
  describe('#add', () => {
    it('should add as Collection<T> does', () => {
      collection.add(new FooModifier());
      expect(collection.count).to.equal(1);
    });
    describe('should trigger collection-level events', () => {
      let modifier: FooModifier;
      let otherModifier: BarModifier;
      beforeEach(() => {
        modifier = new FooModifier();
        otherModifier = new BarModifier();
        collection.add(modifier, otherModifier);
      });
      it('change:modifier:value', (done) => {
        collection.once('change:modifier:value', (affectedModifier: FooModifier) => {
          expect(affectedModifier.value).to.equal(5);
          done();
        });
        modifier.value = 5;
      });
      it('change:modifier:foo:value', (done) => {
        collection.once('change:modifier:foo:value', (affectedModifier: FooModifier) => {
          expect(affectedModifier.value).to.equal(5);
          expect(affectedModifier.id).to.not.equal(otherModifier.id);
          done();
        });
        modifier.value = 5;
      });
      it('change:modifier:active', (done) => {
        collection.once('change:modifier:active', (affectedModifier: FooModifier) => {
          expect(affectedModifier.active).to.be.false;
          done();
        });
        modifier.active = false;
      });
      it('change:modifier:foo:active', (done) => {
        collection.once('change:modifier:foo:active', (affectedModifier: FooModifier) => {
          expect(affectedModifier.active).to.be.false;
          expect(affectedModifier.id).to.not.equal(otherModifier.id);
          done();
        });
        modifier.active = false;
      });
      it('activate:modifier', (done) => {
        collection.once('activate:modifier', (affectedModifier: FooModifier) => {
          expect(affectedModifier.active).to.be.true;
          done();
        });
        modifier.active = false;
        modifier.active = true;
      });
      it('activate:modifier:foo', (done) => {
        collection.once('activate:modifier:foo', (affectedModifier: FooModifier) => {
          expect(affectedModifier.active).to.be.true;
          expect(affectedModifier.id).to.not.equal(otherModifier.id);
          done();
        });
        modifier.active = false;
        modifier.active = true;
      });
      it('deactivate:modifier', (done) => {
        collection.once('deactivate:modifier', (affectedModifier: FooModifier) => {
          expect(affectedModifier.active).to.be.false;
          done();
        });
        modifier.active = false;
      });
      it('deactivate:modifier:foo', (done) => {
        collection.once('deactivate:modifier:foo', (affectedModifier: FooModifier) => {
          expect(affectedModifier.active).to.be.false;
          expect(affectedModifier.id).to.not.equal(otherModifier.id);
          done();
        });
        modifier.active = false;
      });
    });
  });
  describe('#remove', () => {
    beforeEach(() => {
      collection.add(new FooModifier(), new BarModifier());
      collection.once('change:modifier:foo:value', doNothing);
      collection.once('change:modifier:foo:active', doNothing);
      collection.once('activate:modifier:foo', doNothing);
      collection.once('deactivate:modifier:foo', doNothing);
      collection.once('change:modifier:bar:value', doNothing);
      collection.once('change:modifier:bar:active', doNothing);
      collection.once('activate:modifier:bar', doNothing);
      collection.once('deactivate:modifier:bar', doNothing);
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
      it('change:modifier:foo:value', () => {
        expect(eventNames).not.to.contain('change:modifier:foo:value');
        expect(eventNames).to.contain('change:modifier:bar:value');
      });
      it('change:modifier:foo:active', () => {
        expect(eventNames).not.to.contain('change:modifier:foo:active');
        expect(eventNames).to.contain('change:modifier:bar:active');
      });
      it('activate:modifier:foo', () => {
        expect(eventNames).not.to.contain('activate:modifier:foo');
        expect(eventNames).to.contain('activate:modifier:bar');
      });
      it('deactivate:modifier:foo', () => {
        expect(eventNames).not.to.contain('deactivate:modifier:foo');
        expect(eventNames).to.contain('deactivate:modifier:bar');
      });
    });
  });
  describe('#removeAll', () => {
    beforeEach(() => {
      collection.add(new FooModifier(), new BarModifier());
      collection.once('change:modifier:foo:value', doNothing);
      collection.once('change:modifier:foo:active', doNothing);
      collection.once('activate:modifier:foo', doNothing);
      collection.once('deactivate:modifier:foo', doNothing);
      collection.once('change:modifier:bar:value', doNothing);
      collection.once('change:modifier:bar:active', doNothing);
      collection.once('activate:modifier:bar', doNothing);
      collection.once('deactivate:modifier:bar', doNothing);
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
      collection.add(new FooModifier());
    });
    it('should set the value for an existing modifier', () => {
      collection.setValue('foo', 20);
      const foo = collection.get('foo') as FooModifier;
      expect(foo.value).to.equal(20);
    });
    it('should do nothing for a non-existing modifier', () => {
      collection.setValue('lol', 20);
      const lol = collection.get('lol') as Modifier;
      expect(lol).to.equal(undefined);
    });
  });
  describe('#activate', () => {
    beforeEach(() => {
      collection.add(new FooModifier());
    });    
    it('should activate a modifier', () => {
      collection.activate('foo');
      const foo = collection.get('foo') as FooModifier;
      expect(foo.active).to.be.true;
    });
    it('should do nothing for a non-existing modifier', () => {
      collection.activate('lol');
      const lol = collection.get('lol') as Modifier;
      expect(lol).to.equal(undefined);
    });
  });
  describe('#deactivate', () => {
    beforeEach(() => {
      collection.add(new FooModifier());
    });    
    it('should deactivate a modifier', () => {
      collection.deactivate('foo');
      const foo = collection.get('foo') as FooModifier;
      expect(foo.active).to.be.false;
    });
    it('should do nothing for a non-existing modifier', () => {
      collection.deactivate('lol');
      const lol = collection.get('lol') as Modifier;
      expect(lol).to.equal(undefined);
    });
  });
  describe('#getSum', () => {
    beforeEach(() => {
      collection.add(new FooModifier(), new BarModifier());
    });
    it('should sum the value of all the modifiers', () => {
      const foo = collection.get('foo') as Modifier;
      const bar = collection.get('bar') as Modifier;
      expect(collection.getSum()).to.equal(foo.value + bar.value);
    });
    it('should return 0 if no modifiers are in the collection', () => {
      collection.removeAll();
      expect(collection.getSum()).to.equal(0);
    });
  });
  it('should create a collection based on Modifier[]', () => {
    const collection = ModifierCollection.fromArray([new FooModifier(), new BarModifier()]);
    expect(collection.contains('foo')).to.be.true;
    expect(collection.contains('bar')).to.be.true;
  });  
});