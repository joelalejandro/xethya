export default interface IRandomAlgorithm {
  readonly seedNumber: number;
  recommendsToReinstantiate(): boolean;
  generateRandom(): number;
}