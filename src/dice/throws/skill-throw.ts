import { ChanceThrow } from './chance-throw';
import { Skill } from '../../entity/skills/skill';
import ChanceThrowResult from './chance-throw-result';
import { SkillThrowResult } from './skill-throw-result';

export default class SkillThrow extends ChanceThrow {
  private _skill: Skill;

  constructor(skill: Skill) {
    super();

    this._skill = skill;
  }

  get skill() {
    return this._skill;
  }

  roll(): SkillThrowResult {
    const result: ChanceThrowResult = super.roll();
    return new SkillThrowResult({
      skillValue: this._skill.value,
      skillAttributesModifierValue: this._skill.modifiers.getSum(),
      throwResult: result,
    });
  }
}