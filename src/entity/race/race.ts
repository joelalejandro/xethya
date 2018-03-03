import XethyaObject from '../../base/object';
import IHasAttributes from '../attributes/has-attributes.i';
import { Attribute } from '../attributes/attribute';
import AttributeCollection from '../attributes/attribute-collection';
import IHasSkills from '../skills/has-skills.i';
import { Skill } from '../skills/skill';
import SkillCollection from '../skills/skill-collection';
import IHasStats from '../stats/has-stats.i';
import Stat from '../stats/stat';
import StatCollection from '../stats/stat-collection';
import Range from '../../utils/range/range';
import { MoralAlignments } from '../abstract-entity';

export type RaceSettings = {
  id: string;
  name: string;
  lifeExpectancy: Range;
  defaultAlignment: MoralAlignments;
  heightRange: Range;
  heritageAttributes: Attribute[];
  heritageSkills: Skill[];
  heritageStats: Stat[];
}

export class Race extends XethyaObject implements IHasAttributes, IHasSkills, IHasStats {
  id: string;
  name: string;
  attributes: AttributeCollection;
  skills: SkillCollection;
  stats: StatCollection;
  lifeExpectancy: Range;
  defaultAlignment: MoralAlignments;
  heightRange: Range;

  constructor({
    id,
    name = 'Unnamed Race',
    lifeExpectancy = Range.fromArray([90, 100]),
    defaultAlignment = MoralAlignments.NEUTRAL_NEUTRAL,
    heightRange = Range.fromArray([165, 185]),
    heritageAttributes = [],
    heritageSkills = [],
    heritageStats = []
  }: RaceSettings) {
    super();

    this.id = id;
    this.name = name;
    this.attributes = AttributeCollection.fromArray(heritageAttributes);
    this.skills = SkillCollection.fromArray(heritageSkills);
    this.stats = StatCollection.fromArray(heritageStats);
    this.lifeExpectancy = lifeExpectancy;
    this.defaultAlignment = defaultAlignment;
    this.heightRange = heightRange;
  }
}