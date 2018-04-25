import Entity from './entity';
import { IEntitySettings } from './abstract-entity';
import IHasSkills from './skills/has-skills.i';
import SkillCollection from './skills/skill-collection';
import { Skill } from './skills/skill';

export interface IAbleEntitySettings extends IEntitySettings {
  skills: Skill[];
  weight: number;
}

export class AbleEntity extends Entity implements IHasSkills {
  protected _skills: SkillCollection;
  protected _weight: number;

  constructor(settings: IAbleEntitySettings) {
    super(settings);

    this._weight = settings.weight;
    this._skills = SkillCollection.fromArray(settings.skills);
  }

  get skills() {
    return this._skills;
  }

  get weight() {
    return this._weight;
  }

  set weight(value: number) {
    this._weight = value;
  }
}
