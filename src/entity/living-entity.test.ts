import 'mocha';
import { expect } from 'chai';

import { Attribute } from './attributes/attribute';
import Modifier from './modifiers/modifier';
import { Skill } from './skills/skill';
import Stat from './stats/stat';
import { Race } from './race/race';
import { LivingEntity } from './living-entity';
import Range from '../utils/range/range';
import { MoralAlignments } from './abstract-entity';

const Strength = new Attribute({ id: 'strength', initialValue: 10 });
const Anger = new Modifier('anger', 0);
const Punch = new Skill({
  id: 'punch',
  attributes: [Strength],
  modifiers: [Anger],
  primaryAttribute: 'strength',
});

const GeneriStrength = new Attribute({ id: 'strength', initialValue: 5 });
const GeneriPunch = new Skill({
  id: 'punch',
  attributes: [GeneriStrength],
  modifiers: [Anger],
  primaryAttribute: 'strength',
});

const HeartRate = new Stat('heartrate', () => 100);  
const GeneriHeartRate = new Stat('heartrate', () => 120);

const Generi = new Race({
  id: 'generi',
  name: 'Generi',
  lifeExpectancy: new Range(100, 110),
  defaultAlignment: MoralAlignments.CHAOTIC_EVIL,
  heightRange: new Range(120, 250),
  heritageAttributes: [GeneriStrength],
  heritageSkills: [GeneriPunch],
  heritageStats: [GeneriHeartRate],
})

let entity: LivingEntity;
describe('Entity.LivingEntity', () => {
  beforeEach(() => {
    Strength.modifiers.removeAll();
    Punch.modifiers.removeAll();
    HeartRate.modifiers.removeAll();
    entity = new LivingEntity({
      id: 'my-entity',
      name: 'Entity',
      volatile: false,
      attributes: [Strength],
      modifiers: [Anger],
      skills: [Punch],
      stats: [HeartRate],
      age: 30,
      height: 165,
      weight: 90,
      race: Generi,
    })
  });
  it('should instantiate with the expected input', () => {
    expect(entity.id).to.equal('my-entity');
    expect(entity.name).to.equal('Entity');
    expect(entity.volatile).to.be.false;
    expect(entity.attributes.contains('strength')).to.be.true;
    expect(entity.modifiers.contains('anger')).to.be.true;
    expect(entity.skills.contains('punch')).to.be.true;
    expect(entity.stats.contains('heartrate')).to.be.true;
    expect(entity.age).to.equal(30);
    expect(entity.height).to.equal(165);
    expect(entity.weight).to.equal(90);
    expect(entity.race).to.deep.equal(Generi);
  });
  describe('should apply racial traits', () => {
    it('on attributes', () => {
      const strength = entity.attributes.get('strength') as Attribute;
      expect(strength.modifiers.contains('strengthRaceTrait')).to.be.true;
    });
    it('on stats', () => {
      const heartrate = entity.stats.get('heartrate') as Stat;
      expect(heartrate.modifiers.contains('heartrateRaceTrait')).to.be.true;
    });
    it('on skills', () => {
      const punch = entity.skills.get('punch') as Skill;
      expect(punch.modifiers.contains('punchRaceTrait')).to.be.true;
    });
  });
});