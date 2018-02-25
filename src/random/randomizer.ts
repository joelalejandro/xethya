import IConstructableRandomAlgorithm from './constructable-random-algorithm.i';

export default class Randomizer<Algorithm> {
  constructor(private constructorFunction: IConstructableRandomAlgorithm<Algorithm>) {}
  
  create(randomizerSettings: object): Algorithm {
    return new this.constructorFunction(randomizerSettings);
  }
}