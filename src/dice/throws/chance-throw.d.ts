import { DiceThrow, IDiceThrowSettings } from './dice-throw';
import ChanceThrowResult from './chance-throw-result';
import IRollScoreSettings from './roll-score-settings.i';
export interface IChanceThrowSettings extends IDiceThrowSettings {
    rollScores: IRollScoreSettings;
}
export declare class ChanceThrow extends DiceThrow {
    settings: IChanceThrowSettings;
    constructor(settings?: IChanceThrowSettings);
    /**
     * Returns the range for a success rate.
     *
     * @private
     * @function
     * @param {string} key - The success rate to lookup.
     * @return {Range}
     */
    private _range(key);
    /**
     * Determines the success rate of the throw.
     *
     * @private
     * @function
     * @param {Number} rollSum - The results of the throw.
     * @return {String}
     */
    private _calculateThrowType(rollSum);
    /**
     * Rolls the dice.
     *
     * @public
     * @function roll
     * @override
     */
    roll(): ChanceThrowResult;
}
