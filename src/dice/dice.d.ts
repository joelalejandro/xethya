import XethyaObject from '../base/object';
import IRandomAlgorithm from '../random/random-algorithm.i';
import IRandomSettings from '../random/random-settings.i';
export interface IDiceSettings extends IRandomSettings {
    faces: number;
}
export declare class Dice extends XethyaObject {
    private _faces;
    private _mustPreservePrng;
    private _randomStrategy?;
    private _randomizer?;
    private _randomStrategySettings?;
    constructor({faces, randomStrategy, randomStrategySettings}?: IDiceSettings);
    /**
     * Reinitializes the randomizer according to the strategy's recommendation.
     *
     * @private
     * @method _regenerateRandomStrategyIfNeeded
     */
    _regenerateRandomStrategyIfNeeded(): void;
    /**
     * Instantiates the randomizer.
     *
     * @private
     * @method _initializeRandomizer
     */
    private _initializeRandomizer();
    roll(): number;
    /**
     * Sets a new random strategy for the dice.
     *
     * @public
     * @method
     * @param {Class}  randomStrategy - The strategy to use to generate the numbers.
     *                 Must be a class that implements a `generateRandom()` method.
     * @param {Object} [randomStrategySettings = {}] - Specific configuration for the
     *                 randomizer. Most strategies should have default settings so you don't need
     *                 to use this, usually.
     */
    setRandomStrategy(randomStrategy: IRandomAlgorithm, randomStrategySettings?: {}): void;
    /**
     * @throws {Error} if faces isn't a Number or it's less than 2.
     */
    faces: number;
    randomStrategy: IRandomAlgorithm | undefined;
    randomStrategySettings: object | undefined;
    static rollD(faces: number): number;
}
