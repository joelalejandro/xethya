import Modifier from "./modifier";
import { IBaseModifierCalculator, BaseModifierCalculator } from "./base-modifier-calculator";

export default class BaseModifier extends Modifier {
  private _calculateValue: IBaseModifierCalculator = BaseModifierCalculator;
  
  constructor(calculationMethod: IBaseModifierCalculator = BaseModifierCalculator) {
    super('base');

    this._calculateValue = calculationMethod;
  }

  get value() {
    return super.value;
  }

  set value(newValue: number) {
    super.value = this._calculateValue(newValue);
  }
}