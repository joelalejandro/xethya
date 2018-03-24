import IConstructableRandomAlgorithm from './constructable-random-algorithm.i';
export default class Randomizer<Algorithm> {
    private constructorFunction;
    constructor(constructorFunction: IConstructableRandomAlgorithm<Algorithm>);
    create(randomizerSettings: object): Algorithm;
}
