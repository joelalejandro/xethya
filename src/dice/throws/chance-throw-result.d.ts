import DiceThrowResult from './dice-throw-result';
import { DiceThrowTypes } from './dice-throw';
export default class ChanceThrowResult extends DiceThrowResult {
    private _throwType?;
    constructor(throwResult: DiceThrowResult);
    throwType: DiceThrowTypes | undefined;
}
