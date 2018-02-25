import IRandomAlgorithm from "./random-algorithm.i";

export default interface IRandomSettings {
  randomStrategy?: IRandomAlgorithm,
  randomStrategySettings?: object,
};