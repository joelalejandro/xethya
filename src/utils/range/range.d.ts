export default class Range {
    lowerBound: number;
    upperBound: number;
    constructor(lowerBound: number, upperBound: number);
    /**
     * Checks if a value is in the defined range.
     *
     * @public
     * @function
     * @param  {Number} value - Value to compare.
     * @return {Boolean} true if in range, false otherwise.
     */
    includes(value: number): boolean;
    /**
     * Converts the Range object to a string representation.
     *
     * @public
     * @function
     * @return {String}
     */
    toString(): string;
    /**
     * Creates a Range from an array of two numbers.
     *
     * @public
     * @static
     * @function
     * @param  {Array.<Number>} values - Boundaries of the range.
     * @return {Range}
     */
    static fromArray(values: number[]): Range;
    /**
     * Creates a Range from a string-based notation.
     *
     * @public
     * @static
     * @function
     * @param  {String} notedRange - A string representation of a Range,
     *                  using delimiters. Accepted formats: x,y x;y x:y x~y.
     * @return {Range}
     */
    static fromNotation(notedRange: string): Range | undefined;
}
