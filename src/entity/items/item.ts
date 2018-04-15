import { AbleEntity } from '../able-entity';
import IItem from './item.i';
import Price from '../../economy/price';
import IItemSettings from './item-settings.i';

export default class Item extends AbleEntity implements IItem {
  readonly baseValue: Price;

  constructor(settings: IItemSettings) {
    super(settings);

    this.baseValue = settings.baseValue;
  }
};
