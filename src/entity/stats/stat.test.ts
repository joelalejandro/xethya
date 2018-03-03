import 'mocha';
import chai from 'chai';
import spies from 'chai-spies';

chai.use(spies);
const expect = chai.expect;

import Stat from './stat';
import IStatCalculator from './stat-calculator.i';
import { Attribute } from '../attributes/attribute';

const speedCalculator: IStatCalculator = (speed: Stat) => {
  const stamina = speed.attributes.get('stamina') as Attribute;
  const agility = speed.attributes.get('agility') as Attribute;
  
  return stamina.rawValue * agility.rawValue;
};

let stat: Stat;

describe('Entity.Stat', () => {
  beforeEach(() => {
    stat = new Stat('speed', speedCalculator);
    stat.attributes.add(
      new Attribute({ id: 'stamina', initialValue: 10 }),
      new Attribute({ id: 'agility', initialValue: 0.5 }),
    );
  });
  it('should instantiate with the expected input', () => {
    expect(stat.id).to.equal('speed');
    expect(stat.attributes.contains('stamina')).to.be.true;
    expect(stat.attributes.contains('agility')).to.be.true;
  });
  it('should not have a base modifier', () => {
    expect(stat.modifiers.contains('base')).to.be.false;
  });
  it('should return the value using the calculator function', () => {
    const spySpeedCalculator = chai.spy(speedCalculator);
    expect(stat.value).to.equal(5);
    expect(spySpeedCalculator).to.have.been.called;
  });
  it('should emit `change:value` when value is recalculated', (done) => {
    expect(stat.value).to.equal(5);
    stat.once('change:value', ({ previousValue, newValue }) => {
      expect(newValue).to.equal(10);
      done();
    });
    stat.attributes.setValue('stamina', 20);
    expect(stat.value).to.equal(10);
    stat.once('change:value', ({ previousValue, newValue }) => {
      throw new Error('change:value should not have triggered');
    });
    expect(stat.value).to.equal(10); // This tests that change:value won't re trigger
  });
});