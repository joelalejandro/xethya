import IOwned from '../owned.i';
import ICollection from '../../utils/collection/collection.i';
import IStorable from './storable.i';

export default interface IInventory extends IOwned, ICollection<IStorable> {
  maximumCapacity: number;
}
