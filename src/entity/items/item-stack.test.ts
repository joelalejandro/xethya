import 'mocha';
import { expect } from 'chai';

import ItemStack from './item-stack';
import Item from './item';
import IStackableItemSettings from './stackable-item-settings.i';
import StackableItem from './stackable-item';
import Currency from '../../economy/currency';
import Price from '../../economy/price';
import IConstructableStackableItem from './constructable-stackable-item.i';

const CopperPieces = new Currency({
  symbol: 'CP',
  decimalPlaces: 0,
  thousandsSeparator: '.',
  decimalSeparator: '',
  name: 'Copper Pieces',
  shortName: 'Copper',
  format: '{value} {symbol}',
});

class Nugget extends StackableItem {
  constructor() {
    super({
      id: 'nugget',
      name: 'Nugget',
      baseValue: new Price(10, CopperPieces),
      maxAmountInStack: 10,
      weight: 1.2,
      attributes: [],
      skills: [],
      modifiers: [],
      volatile: false,
    })
  }
};

let nuggetStack: ItemStack<Nugget>;

describe('Entity.Items.ItemStack', () => {
  beforeEach(() => {
    nuggetStack = new ItemStack({
      item: Nugget as IConstructableStackableItem<Nugget>,
      amount: 3
    });
  });
});
