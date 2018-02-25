import IRandomAlgorithm from './random-algorithm.i';
import IConstructable from '../utils/constructable.t';

export default interface IConstructableRandomAlgorithm<T> extends IRandomAlgorithm, IConstructable<T> {};