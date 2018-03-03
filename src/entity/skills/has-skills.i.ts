import { Skill } from './skill';
import SkillCollection from './skill-collection';
import Collection from '../../utils/collection/collection';

export default interface IHasSkills {
  skills: SkillCollection | Collection<Skill>
};