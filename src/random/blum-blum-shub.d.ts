import IRandomAlgorithm from "./random-algorithm.i";
/**
 * Default constant value for setting up the BBS PRNG.
 * P must be a prime number.
 *
 * @public
 * @type {Number}
 * @const P
 * @static
 */
export declare const P: number;
/**
 * Default constant value for setting up the BBS PRNG.
 * Q must be a prime number.
 *
 * @public
 * @const Q
 * @static
 * @type {Number}
 */
export declare const Q: number;
/**
 * A list of default seed values, tested to be evenly distributed.

 * @public
 * @const DefaultSeeds
 * @static
 * @type {Array.<Number>}
 * @see  http://wiki.fib.upc.es/sim/index.php/Blum_Blum_Shub#Tests
 */
export declare const DefaultSeeds: number[];
export declare type BlumBlumShubAlgorithmSettings = {
    p?: number;
    q?: number;
    seedNumber?: number;
};
/**
 * Instantiates a Blum Blum Shub PRNG.
 *
 * @public
 * @class BlumBlumShubAlgorithm
 */
export declare class BlumBlumShubAlgorithm implements IRandomAlgorithm {
    settings: BlumBlumShubAlgorithmSettings | undefined;
    readonly seedNumber: number;
    M: number;
    P: number;
    Q: number;
    randomIndex: number;
    /**
     * Initializes the generator.
     *
     * @param  {Number} p    A prime value (defaults to P).
     * @param  {Number} q    A prime value (defaults to Q).
     * @param  {Number} seedNumber A seed number to feed the generator (defaults to any value
     *                       in DefaultSeeds).
     * @constructor
     */
    constructor(settings?: BlumBlumShubAlgorithmSettings | undefined);
    /**
     * Determines if the generator works better by being reinstantiated after
     * every generated number.
     *
     * @public
     * @static
     * @function recommendsToReinstantiate
     * @memberof BlumBlumShubAlgorithm
     * @return {Boolean}
     */
    static recommendsToReinstantiate(): boolean;
    recommendsToReinstantiate(): boolean;
    /**
     * Generates a pseudo-random number and updates the seed for a next roll.
     * Number is always between 0 and 1.
     *
     * @public
     * @function generateRandom
     * @memberof BlumBlumShubAlgorithm
     * @instance
     * @return {Number}
     */
    generateRandom(): number;
    /**
     * Same as `generateRandom()`, but converts the number to an Integer.
     *
     * @public
     * @function generateRandomInteger
     * @memberof BlumBlumShubAlgorithm
     * @instance
     * @return {Number}
     */
    generateRandomInteger(): number;
}
