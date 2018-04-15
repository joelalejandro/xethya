import IItem from './item.i';
import { Skill } from '../skills/skill';

export default interface IWeapon extends IItem {
  primarySkill: Skill;
}
