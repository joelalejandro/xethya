import { Skill } from './skill';
import { SkillThrowResult } from '../../dice/throws/skill-throw-result';
import Collection from '../../utils/collection/collection';
import assert from '../../utils/assert/assert';

export default class SkillCollection extends Collection<Skill> {
  constructor() {
    super('id');
  }

  add(...skills: Skill[]) {
    skills.forEach(skill => this._bindSkillEvents.bind(this));
    super.add(...skills);
  }

  remove(id: string): void {
    this._unbindSkillEvents(id);
    super.remove(id);
  }

  removeAll(): void {
    this.getAll().forEach(skill => this.remove(skill.id));
  }

  useSkill(id: string): SkillThrowResult {
    assert(this.contains(id), 'SkillCollection#useSkill: skill does not exist');

    return (this.get(id) as Skill).use();
  }

  private _bindSkillEvents(skill: Skill): void {
    skill.on('before:use', (...args) => {
      this.emit('before:use:skill', ...args);
      this.emit(`before:use:skill:${skill.id}`, ...args);
    });

    skill.on('use', (...args) => {
      this.emit('use:skill', ...args);
      this.emit(`use:skill:${skill.id}`, ...args);
    });
  }

  private _unbindSkillEvents(id: string): void {
    this.off(`before:use:skill:${id}`);
    this.off(`use:skill:${id}`);
  }

  static fromArray(skills: Skill[]): SkillCollection {
    const collection: SkillCollection = new SkillCollection();

    collection.add(...skills);

    return collection;
  }
}