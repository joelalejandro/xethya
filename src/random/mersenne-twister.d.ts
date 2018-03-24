import IRandomAlgorithm from "./random-algorithm.i";
/**
 * @ignore
 */
export declare const N: number;
/**
 * @ignore
 */
export declare const M: number;
/**
 * @ignore
 */
export declare const MATRIX_A: number;
/**
 * @ignore
 */
export declare const UPPER_MASK: number;
/**
 * @ignore
 */
export declare const LOWER_MASK: number;
/**
 * @ignore
 */
export declare const INIT_BY_ARRAY_SEED: number;
export declare type MersenneTwisterAlgorithmSettings = {
    seedNumber?: number;
};
export declare class MersenneTwisterAlgorithm implements IRandomAlgorithm {
    settings: MersenneTwisterAlgorithmSettings | undefined;
    seedNumber: number;
    MT: number[];
    MTI: number;
    /**
     * Instantiates the Mersenne-Twister generator.
     *
     * @param  {Object} settings - Configuration for the generator:
     *         - seedNumber: The number for the seed.
     */
    constructor(settings?: MersenneTwisterAlgorithmSettings | undefined);
    /**
     * Determines if the generator works better by being reinstantiated after
     * every generated number.
     *
     * @public
     * @function recommendsToReinstantiate
     * @memberof MersenneTwisterAlgorithm
     * @static
     * @return {Boolean}
     */
    static recommendsToReinstantiate(): boolean;
    recommendsToReinstantiate(): boolean;
    /**
     * Loads the initialization vector required for the algorithm,
     * according to a given seed.
     *
     * @public
     * @method initializeRandomGenerator
     * @memberof MersenneTwisterAlgorithm
     * @instance
     * @param  {Number} seedNumber - A seed can be any non-negative integer value.
     */
    initializeRandomGenerator(seedNumber: number): void;
    /**
     * An alternative way to load the initialization vector for the algorithm.
     *
     * @public
     * @method initializeByArray
     * @memberof MersenneTwisterAlgorithm
     * @instance
     * @param  {Array.<Number>} initKeyArray - A list of non-negative integer values.
     */
    initializeByArray(initKeyArray: number[]): void;
    /**
     * Returns a random non-negative integer value.
     *
     * @public
     * @function generateRandomInteger
     * @memberof MersenneTwisterAlgorithm
     * @instance
     * @return {Number}
     */
    generateRandomInteger(): number;
    /**
     * Returns a non-negative random integer value, within
     * the range of Int31.
     *
     * @public
     * @function generateRandomInteger31
     * @memberof MersenneTwisterAlgorithm
     * @instance
     * @return {Number}
     */
    generateRandomInteger31(): number;
    /**
     * Returns a non-negative random real number between 0 and 1.
     *
     * @public
     * @function generateRandomReal
     * @memberof MersenneTwisterAlgorithm
     * @instance
     * @return {Number}
     */
    generateRandomReal(): number;
    /**
     * Returns a non-negative random number between 0 and 1.
     *
     * @public
     * @function generateRandom
     * @memberof MersenneTwisterAlgorithm
     * @instance
     * @return {Number}
     */
    generateRandom(): number;
    /**
     * Returns a non-negative random real number between 0 and 1.
     *
     * @public
     * @function generateRandomReal3
     * @memberof MersenneTwisterAlgorithm
     * @instance
     * @return {Number}
     */
    generateRandomReal3(): number;
    /**
     * Returns a non-negative random rumber with a resolution
     * of 53 bits.
     *
     * @public
     * @function generateRandomReal53BitResolution
     * @memberof MersenneTwisterAlgorithm
     * @instance
     * @return {Number}
     */
    generateRandomReal53BitResolution(): number;
}
