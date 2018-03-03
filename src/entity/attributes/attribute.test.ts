import 'mocha';
import chai from 'chai';
import spies from 'chai-spies';

chai.use(spies);
const expect = chai.expect;

import { Attribute } from './attribute';
import Range from '../../utils/range/range';
import assert from '../../utils/assert/assert';

describe('Entity.Attribute', () => {
  it('should instantiate with the expected input', () => {
    const attributeWithoutValue = new Attribute({
      id: 'foo'
    });

    expect(attributeWithoutValue.id).to.equal('foo');
    expect(attributeWithoutValue.rawValue).to.equal(0);
    expect(attributeWithoutValue.value).to.equal(-5);
    expect(attributeWithoutValue.modifiers.count).to.equal(1);
    expect(attributeWithoutValue.modifiers.contains('base')).to.equal(true);
    
    const attributeWithValue = new Attribute({
      id: 'bar',
      initialValue: 10,
    });

    expect(attributeWithValue.id).to.equal('bar');
    expect(attributeWithValue.rawValue).to.equal(10);
    expect(attributeWithValue.value).to.equal(10);
    expect(attributeWithValue.modifiers.count).to.equal(1);
    expect(attributeWithValue.modifiers.contains('base')).to.equal(true);
  });
  it('should set a value and refresh the base modifier', () => {
    const attribute = new Attribute({ id: 'foo' });
    attribute.rawValue = 20;
    expect(attribute.baseModifierValue).to.equal(5);
  });
  it('should not check if the value is in range when no range is defined', () => {
    const attribute = new Attribute({ id: 'foo' });
    const spy = chai.spy.on(assert);
    attribute.rawValue = 20;
    expect(spy).to.not.have.been.called;
  });
  it('should fail when trying to set an out-of-range value', () => {
    const attribute = new Attribute({ 
      id: 'foo', 
      initialValue: 10,
      valueRange: Range.fromArray([5, 15])  
    });

    expect(() => {
      attribute.rawValue = 1;
    }).to.throw(/value is out of range/);
  });
  it('should do nothing if the value does not really change', () => {
    const attribute = new Attribute({ 
      id: 'foo', 
      initialValue: 10,
    });

    const spy = chai.spy.on(attribute, 'emit');
    attribute.rawValue = 10;

    expect(spy).to.not.have.been.called;
  });
  it('should trigger `before:change:value` when changing the value', (done) => {
    const attribute = new Attribute({ id: 'foo' });
    attribute.once('before:change:value', ({ previousValue, newValue }) => {
      expect(previousValue).to.equal(0);
      expect(newValue).to.equal(20);
      done();
    });
    attribute.rawValue = 20;  
  });
  it('should trigger `change:value` after changing the value', (done) => {
    const attribute = new Attribute({ id: 'foo' });
    attribute.once('change:value', (affectedAttribute) => {
      expect(affectedAttribute.rawValue).to.equal(20);
      done();
    });
    attribute.rawValue = 20;  
  });
  it('should calculate the attribute\'s value with its modifiers', () => {
    const attribute = new Attribute({ id: 'foo', initialValue: 20 });
    expect(attribute.value).to.equal(attribute.rawValue + attribute.modifiers.getSum());
  });
  it('should format the attribute as a string', () => {
    const positiveAttribute = new Attribute({ id: 'foo', initialValue: 20 });
    expect(positiveAttribute.toString()).to.equal('20 (+5)');

    const neutralAttribute = new Attribute({ id: 'foo', initialValue: 10 });
    expect(neutralAttribute.toString()).to.equal('10 (+0)');

    const negativeAttribute = new Attribute({ id: 'foo', initialValue: 0 });
    expect(negativeAttribute.toString()).to.equal('0 (-5)');
  });
});