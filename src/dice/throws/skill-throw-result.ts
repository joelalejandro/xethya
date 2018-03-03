import ChanceThrowResult from './chance-throw-result';

export type SkillThrowResultSettings = {
  skillValue: number,
  skillAttributesModifierValue: number,
  throwResult: ChanceThrowResult,
};

export class SkillThrowResult extends ChanceThrowResult {
  private _skillValue: number;
  private _skillAttributeModifiersValue: number;
  private _failureRoll?: ChanceThrowResult;

  constructor({
    skillValue,
    skillAttributesModifierValue,
    throwResult
  }: SkillThrowResultSettings) {
    super(throwResult);
    
    this._skillValue = skillValue;
    this._skillAttributeModifiersValue = skillAttributesModifierValue;
  }

  get skillValue() {
    return this._skillValue;
  }

  get skillAttributeModifiersValue() {
    return this._skillAttributeModifiersValue;
  }

  get totalRollValue() {
    return this.skillValue + this.getRollSum() + this.skillAttributeModifiersValue;
  }

  get failureRoll() {
    return this._failureRoll;
  }

  set failureRoll(roll: ChanceThrowResult | undefined) {
    this._failureRoll = roll;
  }
}