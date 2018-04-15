import 'mocha';
import { expect } from 'chai';

import { Attribute } from '../attributes/attribute';
import Modifier from '../modifiers/modifier';
import { Skill } from '../skills/skill';
import XethyaObject from '../../base/object';

let Punch: Skill;

describe('Entity.Skill', () => {
  beforeEach(() => {
    const Strength = new Attribute({ id: 'strength', initialValue: 10 });
    const Power = new Attribute({ id: 'power', initialValue: 10 });
    const Anger = new Modifier('anger', 0);
    Punch = new Skill({
      id: 'punch',
      attributes: [Strength, Power],
      modifiers: [Anger],
      primaryAttribute: 'strength',
    });
  });
  it('should instantiate with the expected values', () => {
    expect(Punch.id).to.equal('punch');
    expect(Punch.attributes.contains('strength')).to.be.true;
    expect(Punch.modifiers.contains('anger')).to.be.true;
    expect(Punch.value).to.equal((Punch.attributes.get('strength') as Attribute).value);
    expect((Punch.primaryAttribute as Attribute).id).to.equal('strength');
  });
  it('should instantiate with only an ID', () => {
    expect(new Skill({ id: 'foo' }).id).to.equal('foo');
  });
  it('should instantiate with only an ID and owner', () => {
    expect(new Skill({ id: 'foo' }).id).to.equal('foo');
    expect(new Skill({ id: 'foo', owner: new XethyaObject() }).id).to.equal('foo');
  });
  it('should trigger `before:use`', (done) => {
    Punch.once('before:use', (skill) => {
      expect(Punch).to.deep.equal(skill);
      done();
    });
    Punch.use();
  });
  it('should trigger `use`', (done) => {
    Punch.once('use', (skill) => {
      expect(Punch).to.deep.equal(skill);
      done();
    });
    Punch.use();
  });
  it('should allow to change the primary attribute', () => {
    Punch.primaryAttribute = Punch.attributes.get('power') as Attribute;
    expect(Punch.primaryAttribute.id).to.equal('power');
  });
});
