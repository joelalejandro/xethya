import { Skill } from './skill';
import { SkillThrowResult } from '../../dice/throws/skill-throw-result';
import Collection from '../../utils/collection/collection';
export default class SkillCollection extends Collection<Skill> {
    constructor();
    add(...skills: Skill[]): void;
    remove(id: string): void;
    removeAll(): void;
    useSkill(id: string): SkillThrowResult;
    private _bindSkillEvents(skill);
    private _unbindSkillEvents(id);
    static fromArray(skills: Skill[]): SkillCollection;
}
