import 'mocha';
import chai from 'chai';
import spies from 'chai-spies';

chai.use(spies);
const expect = chai.expect;

import Modifier from './modifier';

describe('Entity.Modifier', () => {
  it('should instantiate with expected input', () => {
    const modifierWithoutValue = new Modifier('foo');
    expect(modifierWithoutValue.id).to.equal('foo');

    const modifierWithValue = new Modifier('bar', 10);
    expect(modifierWithValue.id).to.equal('bar');
    expect(modifierWithValue.value).to.equal(10);

    const modifierWithValueAndSource = new Modifier('bar', 10, { id: 'foo' });
    expect(modifierWithValueAndSource.id).to.equal('bar');
    expect(modifierWithValueAndSource.value).to.equal(10);
    expect(modifierWithValueAndSource.source).to.deep.equal({ id: 'foo' });
  });

  it('should do nothing if `active` is set to its current value', () => {
    const modifier = new Modifier('foo');
    const spyEmit = chai.spy.on(modifier, 'emit');
    modifier.active = true;
    expect(spyEmit).to.not.have.been.called;    
  });

  it('should trigger `deactivate` when setting active = false', (done) => {
    const modifier = new Modifier('foo');
    modifier.once('deactivate', (affectedModifier: Modifier) => {
      expect(affectedModifier.active).to.be.false;
      done();
    });
    modifier.active = false;
  });

  it('should trigger `activate` when setting active = true', (done) => {
    const modifier = new Modifier('foo');
    modifier.once('activate', (affectedModifier: Modifier) => {
      expect(affectedModifier.active).to.be.true;
      done();
    });
    modifier.active = false;
    modifier.active = true;
  });  

  it('should trigger `change:active` when setting active to any value', (done) => {
    const modifier = new Modifier('foo');
    modifier.once('deactivate', (affectedModifier: Modifier) => {
      expect(affectedModifier.active).to.be.false;
    });
    modifier.active = false;
    modifier.once('activate', (affectedModifier: Modifier) => {
      expect(affectedModifier.active).to.be.true;
      done();
    });
    modifier.active = true;
  });

  it('should do nothing if setting value without changes', () => {
    const modifier = new Modifier('foo', 10);
    const spyEmit = chai.spy.on(modifier, 'emit');
    modifier.value = 10;
    expect(spyEmit).to.not.have.been.called;
  });

  it('should trigger `before:change:value` when changing the value', (done) => {
    const modifier = new Modifier('foo');
    modifier.once('before:change:value', ({ previousValue, newValue }) => {
      expect(previousValue).to.equal(0);
      expect(newValue).to.equal(10);
      done();
    });
    modifier.value = 10;
  });

  it('should trigger `change:value` when changing the value', (done) => {
    const modifier = new Modifier('foo');
    modifier.once('change:value', (affectedModifier: Modifier) => {
      expect(affectedModifier.value).to.equal(10);
      done();
    });
    modifier.value = 10;
  });
});