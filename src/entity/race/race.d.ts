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
export declare type RaceSettings = {
    id: string;
    name: string;
    lifeExpectancy: Range;
    defaultAlignment: MoralAlignments;
    heightRange: Range;
    heritageAttributes: Attribute[];
    heritageSkills: Skill[];
    heritageStats: Stat[];
};
export declare class Race extends XethyaObject implements IHasAttributes, IHasSkills, IHasStats {
    id: string;
    name: string;
    attributes: AttributeCollection;
    skills: SkillCollection;
    stats: StatCollection;
    lifeExpectancy: Range;
    defaultAlignment: MoralAlignments;
    heightRange: Range;
    constructor({id, name, lifeExpectancy, defaultAlignment, heightRange, heritageAttributes, heritageSkills, heritageStats}: RaceSettings);
}
