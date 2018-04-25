import { AbleEntity } from '../able-entity';
import IPrice from '../../economy/price.i';
import IStorable from '../inventory/storable.i';

export default interface IItem extends IStorable, AbleEntity {
  readonly baseValue: IPrice;
};
