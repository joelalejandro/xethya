import { IAbleEntitySettings } from '../able-entity';
import IPrice from '../../economy/price.i';

export default interface IItemSettings extends IAbleEntitySettings {
  baseValue: IPrice
}
