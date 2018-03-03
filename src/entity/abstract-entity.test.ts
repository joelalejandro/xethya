import 'mocha';
import { expect } from 'chai';

import { AbstractEntity, IEntitySettings } from './abstract-entity';
import { Attribute } from './attributes/attribute';
import Modifier from './modifiers/modifier';

class MyEntity extends AbstractEntity {
  constructor(settings: IEntitySettings) {
    super(settings);
  }
}

class MyDefaultEntity extends AbstractEntity {
  constructor() { super(); }
}

describe('Entity.AbstractEntity', () => {
  it('should instantiate with the expected input', () => {
    const entity = new MyEntity({
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
    const entity = new MyEntity({
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
    const defaultEntity = new MyDefaultEntity();
    expect(defaultEntity.id).to.equal(undefined);
    expect(defaultEntity.name).to.equal('UnnamedEntity');
    expect(defaultEntity.volatile).to.equal(false);
    expect(defaultEntity.attributes.count).to.equal(0);
    expect(defaultEntity.modifiers.count).to.equal(0);
  });
});