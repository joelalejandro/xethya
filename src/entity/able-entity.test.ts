import 'mocha';
import { expect } from 'chai';

import { AbleEntity, IAbleEntitySettings } from './able-entity';
import { Attribute } from './attributes/attribute';
import Modifier from './modifiers/modifier';
import { Skill } from './skills/skill';

const Strength = new Attribute({ id: 'strength', initialValue: 10 });
const Anger = new Modifier('anger', 0);
const Punch = new Skill({
  id: 'punch',
  attributes: [Strength],
  modifiers: [Anger],
  primaryAttribute: 'strength',
});

let entity: AbleEntity;
describe('Entity.AbleEntity', () => {
  beforeEach(() => {
    entity = new AbleEntity({
      id: 'my-entity',
      name: 'Entity',
      volatile: false,
      attributes: [Strength],
      modifiers: [Anger],
      skills: [Punch],
      weight: 10,
    });
  });
  it('should instantiate with the expected input', () => {
    expect(entity.id).to.equal('my-entity');
    expect(entity.name).to.equal('Entity');
    expect(entity.volatile).to.be.false;
    expect(entity.attributes.contains('strength')).to.be.true;
    expect(entity.modifiers.contains('anger')).to.be.true;
    expect(entity.skills.contains('punch')).to.be.true;
    expect(entity.weight).to.equal(10);
  });
});
