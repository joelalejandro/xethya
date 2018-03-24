import { ChanceThrow } from './chance-throw';
import { Skill } from '../../entity/skills/skill';
import { SkillThrowResult } from './skill-throw-result';
export default class SkillThrow extends ChanceThrow {
    private _skill;
    constructor(skill: Skill);
    readonly skill: Skill;
    roll(): SkillThrowResult;
}
