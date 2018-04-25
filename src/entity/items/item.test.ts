import 'mocha';
import { expect } from 'chai';

import Item from './item';
import IItemSettings from './item-settings.i';
import Price from '../../economy/price';
import Currency from '../../economy/currency';

const CopperPieces = new Currency({
  symbol: 'CP',
  decimalPlaces: 0,
  thousandsSeparator: '.',
  decimalSeparator: '',
  name: 'Copper Pieces',
  shortName: 'Copper',
  format: '{value} {symbol}',
});

const item = new Item({
  id: 'stone',
  name: 'Stone',
  weight: 1,
  volatile: false,
  attributes: [],
  modifiers: [],
  skills: [],
  baseValue: new Price(10, CopperPieces),
});

describe('Entity.Items.Item', () => {
  it('should instantiate with the expected input', () => {
    expect(item.id).to.equal('stone');
    expect(item.name).to.equal('Stone');
    expect(item.weight).to.equal(1);
    expect(item.volatile).to.be.false;
    expect(item.attributes.count).to.equal(0);
    expect(item.skills.count).to.equal(0);
    expect(item.modifiers.count).to.equal(0);
    expect(item.baseValue.amount).to.equal(10);
    expect(item.baseValue.currency).to.deep.equal(CopperPieces);
  });
});
