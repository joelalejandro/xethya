import Modifier from "./modifier";
import { IBaseModifierCalculator } from "./base-modifier-calculator";
export default class BaseModifier extends Modifier {
    private _calculateValue;
    constructor(calculationMethod?: IBaseModifierCalculator);
    value: number;
}
