import 'mocha';
import { expect } from 'chai';

import ItemStack from './item-stack';
import Item from './item';
import IStackableItemSettings from './stackable-item-settings.i';
import StackableItem from './stackable-item';
import Currency from '../../economy/currency';
import Price from '../../economy/price';

const CopperPieces = new Currency({
  symbol: 'CP',
  decimalPlaces: 0,
  thousandsSeparator: '.',
  decimalSeparator: '',
  name: 'Copper Pieces',
  shortName: 'Copper',
  format: '{value} {symbol}',
});

const nugget = new StackableItem({
  id: 'nugget',
  name: 'Nugget',
  baseValue: new Price(10, CopperPieces),
  maxAmountInStack: 10,
  weight: 1.2,
  attributes: [],
  skills: [],
  modifiers: [],
  volatile: false,
});

describe('Entity.Items.StackableItem', () => {
  it('should instantiate with the expected input', () => {
    expect(nugget.id).to.equal('nugget');
    expect(nugget.name).to.equal('Nugget');
    expect(nugget.baseValue.amount).to.equal(10);
    expect(nugget.baseValue.currency).to.deep.equal(CopperPieces);
    expect(nugget.maxAmountInStack).to.equal(10);
    expect(nugget.weight).to.equal(1.2);
    expect(nugget.attributes.count).to.equal(0);
    expect(nugget.modifiers.count).to.equal(0),
    expect(nugget.skills.count).to.equal(0);
    expect(nugget.volatile).to.be.false;
  });
});
