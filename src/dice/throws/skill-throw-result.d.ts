import ChanceThrowResult from './chance-throw-result';
export declare type SkillThrowResultSettings = {
    skillValue: number;
    skillAttributesModifierValue: number;
    throwResult: ChanceThrowResult;
};
export declare class SkillThrowResult extends ChanceThrowResult {
    private _skillValue;
    private _skillAttributeModifiersValue;
    private _failureRoll?;
    constructor({skillValue, skillAttributesModifierValue, throwResult}: SkillThrowResultSettings);
    readonly skillValue: number;
    readonly skillAttributeModifiersValue: number;
    readonly totalRollValue: number;
    failureRoll: ChanceThrowResult | undefined;
}
