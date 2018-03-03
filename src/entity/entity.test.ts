import 'mocha';
import { expect } from 'chai';

import Entity from './entity';
import { Attribute } from './attributes/attribute';
import Modifier from './modifiers/modifier';
import { IEntitySettings } from './abstract-entity';

describe('Entity.Entity', () => {
  it('should instantiate with the expected input', () => {
    const entity = new Entity({
      id: 'my-entity',
      name: 'Entity',
      volatile: false,
      attributes: [new Attribute({ id: 'strength', initialValue: 10 })],
      modifiers: [new Modifier('anger', 0)],
    });
    expect(entity.id).to.equal('my-entity');
    expect(entity.name).to.equal('Entity');
    expect(entity.volatile).to.be.false;
    expect(entity.attributes.contains('strength')).to.be.true;
    expect(entity.modifiers.contains('anger')).to.be.true;
  });
  it('should allow renaming the entity', () => {
    const entity = new Entity({
      id: 'my-entity',
      name: 'Entity',
      volatile: false,
      attributes: [new Attribute({ id: 'strength', initialValue: 10 })],
      modifiers: [new Modifier('anger', 0)],
    });
    entity.name = 'Jane';
    expect(entity.name).to.equal('Jane');
  });
  it('should instantiate a valid Entity with default values', () => {
    const defaultEntity = new Entity({} as IEntitySettings);
    expect(defaultEntity.id).to.equal(undefined);
    expect(defaultEntity.name).to.equal('UnnamedEntity');
    expect(defaultEntity.volatile).to.equal(false);
    expect(defaultEntity.attributes.count).to.equal(0);
    expect(defaultEntity.modifiers.count).to.equal(0);
  });
});