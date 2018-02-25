import DiceThrowResult from './dice-throw-result';
import { DiceThrowTypes } from './dice-throw';

const allowedThrowTypes = [
  DiceThrowTypes.FAILURE,
  DiceThrowTypes.SUCCESS,
  DiceThrowTypes.CRITICAL_SUCCESS
];

export default class ChanceThrowResult extends DiceThrowResult {
  private _throwType?: DiceThrowTypes;

  constructor(throwResult: DiceThrowResult) {
    super();
    this.rolls = this.rolls.concat(throwResult.rolls);
  }

  get throwType() {
    return this._throwType;
  }

  set throwType(value) {
    this._throwType = value;
  }
}
