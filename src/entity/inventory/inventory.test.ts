import 'mocha';
import { expect } from 'chai';

import Inventory from './inventory';
import Entity from '../entity';
import Currency from '../../economy/currency';
import Item from '../items/item';
import Price from '../../economy/price';
import ItemStack from '../items/item-stack';
import StackableItem from '../items/stackable-item';

let inventory: Inventory;

const inventoryOwner = new Entity({
  id: 'inventory-owner',
  name: 'Chester',
  attributes: [],
  modifiers: [],
  volatile: false
});

const CopperPieces = new Currency({
  symbol: 'CP',
  decimalPlaces: 0,
  thousandsSeparator: '.',
  decimalSeparator: '',
  name: 'Copper Pieces',
  shortName: 'Copper',
  format: '{value} {symbol}',
});

class BigStone extends StackableItem {
  constructor() {
    super({
      id: 'stone',
      name: 'Stone',
      weight: 100,
      volatile: false,
      attributes: [],
      modifiers: [],
      skills: [],
      baseValue: new Price(10, CopperPieces),
      maxAmountInStack: 10,
    });
  }
}

const singleItem = new Item({
  id: 'stone',
  name: 'Stone',
  weight: 100,
  volatile: false,
  attributes: [],
  modifiers: [],
  skills: [],
  baseValue: new Price(10, CopperPieces),
});

const itemStack = new ItemStack(BigStone, 2);
const largeItemStack = new ItemStack(BigStone, 5);

describe('Entity.Inventory', () => {
  beforeEach(() => {
    inventory = new Inventory({
      maximumCapacity: 300,
      owner: inventoryOwner,
    });
  });
  it('should instantiate with the expected input', () => {
    expect(inventory.maximumCapacity).to.equal(300);
    expect(inventory.owner).to.deep.equal(inventoryOwner);
  });
  it('should add items to the inventory', () => {
    inventory.add(singleItem, itemStack);
    expect(inventory.count).to.equal(300);
    expect(inventory.get('stack:stone')).to.deep.equal(itemStack);
    expect(inventory.get('stone')).to.deep.equal(singleItem);
  });
  it('should throw an error when fetching from the inventory if exceeds maximum capacity', () => {
    expect(() => {
      inventory.add(singleItem, largeItemStack);
    }).to.throw(/cannot add all items/);
  });
});
