import Entity from './entity';
import { IEntitySettings } from './abstract-entity';
import IHasSkills from './skills/has-skills.i';
import SkillCollection from './skills/skill-collection';
import { Skill } from './skills/skill';
export interface IAbleEntitySettings extends IEntitySettings {
    skills: Skill[];
}
export declare class AbleEntity extends Entity implements IHasSkills {
    protected _skills: SkillCollection;
    constructor(settings: IAbleEntitySettings);
    readonly skills: SkillCollection;
}
