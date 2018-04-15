import { AbleEntity } from '../able-entity';
import IPrice from '../../economy/price.i';

export default interface IItem extends AbleEntity {
  readonly baseValue: IPrice;
};
