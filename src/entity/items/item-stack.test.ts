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
    });
  }
};

let nuggetStack: ItemStack<Nugget>;

describe('Entity.Items.ItemStack', () => {
  beforeEach(() => {
    nuggetStack = new ItemStack(Nugget, 5);
  });
  it('should instantiate with the expected input', () => {
    expect(nuggetStack.id).to.equal('stack:nugget');
    expect(nuggetStack.amount).to.equal(5);
    expect(nuggetStack.capacity).to.equal(10);
    expect(nuggetStack.item).to.deep.equal(Nugget);
    expect(nuggetStack.weight).to.equal(6);
  });
  it('should calculate the base value according to the amount of items in the stack', () => {
    expect(nuggetStack.baseValue.amount).to.equal(50);
  });
  it('should throw an error when trying to set an amount of items beyond the stack\'s capacity', () => {
    expect(() => {
      nuggetStack.amount = 15;
    }).to.throw(/cannot exceed/);
  });
  it('should throw an error when trying to set a negative amount of items', () => {
    expect(() => {
      nuggetStack.amount = -1;
    }).to.throw(/cannot be less than zero/);
  });
  it('should trigger "destroy" event when there are no further items in the stack', (done) => {
    nuggetStack.once('destroy', () => { done(); });
    nuggetStack.amount = 0;
  });
  it('should be able to push to the stack', () => {
    nuggetStack.push();
    expect(nuggetStack.amount).to.equal(6);
  });
  it('should throw an error when pushing beyond the stack\'s capacity', () => {
    expect(() => {
      nuggetStack.push();
      nuggetStack.push();
      nuggetStack.push();
      nuggetStack.push();
      nuggetStack.push();
      nuggetStack.push();
    }).to.throw(/cannot exceed/);
  });
  it('should be able to pop from the stack', () => {
    expect(nuggetStack.pop()).to.deep.equal(new Nugget());
    expect(nuggetStack.amount).to.equal(4);
  });
  it('should throw an error when popping below zero', () => {
    expect(() => {
      nuggetStack.pop();
      nuggetStack.pop();
      nuggetStack.pop();
      nuggetStack.pop();
      nuggetStack.pop();
      nuggetStack.pop();
    }).to.throw(/cannot be less than zero/);
  });
});
