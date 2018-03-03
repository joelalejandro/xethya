import 'mocha';
import chai from 'chai';
import spies from 'chai-spies';

chai.use(spies);
const expect = chai.expect;

import StatCollection from './stat-collection';
import Stat from './stat';
import Collection from '../../utils/collection/collection';
import { Attribute } from '../attributes/attribute';
import IStatCalculator from './stat-calculator.i';

const FooCalculator: IStatCalculator = (foo: Stat) => {
  const alpha = foo.attributes.get('alpha') as Attribute;
  return alpha.baseModifierValue * 2;
};

class FooStat extends Stat {
  constructor() {
    super('foo', FooCalculator);
    this.attributes.add(new Attribute({ 
      id: 'alpha',
      initialValue: 5,
    }));
  }
}

const BarCalculator: IStatCalculator = (bar: Stat) => {
  const beta = bar.attributes.get('beta') as Attribute;
  return beta.baseModifierValue * 4;
};

class BarStat extends Stat {
  constructor() {
    super('bar', BarCalculator);
    this.attributes.add(new Attribute({ 
      id: 'beta',
      initialValue: 5,
    }));
  }
}

const doNothing = () => {};

let collection: StatCollection;

describe('Entity.StatCollection', () => {
  beforeEach(() => {
    collection = new StatCollection();
  });
  it('should use `id` as key', () => {
    expect(collection.indexName).to.equal('id');
  });
  describe('#add', () => {
    it('should add as Collection<T> does', () => {
      collection.add(new FooStat());
      expect(collection.count).to.equal(1);
    });
    // TODO: Check why events are failing here.
    describe.skip('should trigger collection-level events', () => {
      let stat: FooStat;
      let otherStat: BarStat;
      beforeEach(() => {
        stat = new FooStat();
        otherStat = new BarStat();
        collection.add(stat, otherStat);
      });
      it('change:stat:value', (done) => {
        collection.once('change:stat:value', ({ previousValue, newValue }) => {
          expect(newValue).to.equal(20);
          done();
        });
        stat.attributes.setValue('alpha', 30);
        expect(stat.value).to.equal(20);
      });
      it('change:stat:foo:value', (done) => {
        collection.once('change:stat:foo:value', ({ previousValue, newValue }) => {
          expect(newValue).to.equal(20);
          done();
        });
        stat.attributes.setValue('alpha', 30);
        expect(stat.value).to.equal(20);
      });
    });
  });
  describe('#remove', () => {
    beforeEach(() => {
      collection.add(new FooStat(), new BarStat());
      collection.once('change:stat:foo:value', doNothing);
      collection.once('change:stat:bar:value', doNothing);
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
      it('change:stat:foo:value', () => {
        expect(eventNames).not.to.contain('change:stat:foo:value');
        expect(eventNames).to.contain('change:stat:bar:value');
      });
    });
  });
  describe('#removeAll', () => {
    beforeEach(() => {
      collection.add(new FooStat(), new BarStat());
      collection.once('change:stat:foo:value', doNothing);
      collection.once('change:stat:bar:value', doNothing);
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
  it('should create a collection based on Stat[]', () => {
    const collection = StatCollection.fromArray([new FooStat(), new BarStat()]);
    expect(collection.contains('foo')).to.be.true;
    expect(collection.contains('bar')).to.be.true;
  });  
});