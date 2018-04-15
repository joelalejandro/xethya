import 'mocha';
import { expect } from 'chai';

import Price from './price';
import Currency from './currency';

let price: Price;
let secondPrice: Price;
let freePrice: Price;
let debtPrice: Price;
let foreignPrice: Price;

const ArgentinePesos = new Currency({
  symbol: '$',
  decimalPlaces: 2,
  thousandsSeparator: ',',
  decimalSeparator: '.',
  name: 'Pesos Argentinos',
  shortName: 'ARS',
  format: '{symbol} {value}',
});

const USDollars = new Currency({
  symbol: 'US$',
  decimalPlaces: 2,
  thousandsSeparator: '.',
  decimalSeparator: ',',
  name: 'American Dollars',
  shortName: 'USD',
  format: '{symbol} {value}',
});

describe('Economy.Price', () => {
  beforeEach(() => {
    price = new Price(1000, ArgentinePesos);
    secondPrice = new Price(500, ArgentinePesos);
    freePrice = new Price(0, ArgentinePesos);
    debtPrice = new Price(-100, ArgentinePesos);
    foreignPrice = new Price(100, USDollars);
  });
  it('should instantiate with the expected input', () => {
    expect(price.amount).to.equal(1000);
    expect(price.currency).to.deep.equal(ArgentinePesos);
  });
  it('should format as a price', () => {
    expect(price.format()).to.equal('$ 1,000.00');
    expect(price.formattedPrice).to.equal('$ 1,000.00');
    expect(price.toString()).to.equal('$ 1,000.00');
  });
  it('should sum prices', () => {
    expect(price.plus(price).amount).to.equal(price.amount + price.amount);
    expect(price.plus(secondPrice).amount).to.equal(price.amount + secondPrice.amount);
    expect(price.plus(freePrice).amount).to.equal(price.amount);
    expect(price.plus(debtPrice).amount).to.equal(price.amount + debtPrice.amount);
  });
  it('should not allow to sum prices of different currencies', () => {
    expect(() => {
      price.plus(foreignPrice);
    }).to.throw(/cannot mix currencies/);
  });
  it('should not allow to subtract prices of different currencies', () => {
    expect(() => {
      price.minus(foreignPrice);
    }).to.throw(/cannot mix currencies/);
  });
  it('should subtract prices', () => {
    expect(price.minus(price).amount).to.equal(price.amount - price.amount);
    expect(price.minus(secondPrice).amount).to.equal(price.amount - secondPrice.amount);
    expect(price.minus(freePrice).amount).to.equal(price.amount);
    expect(price.minus(debtPrice).amount).to.equal(price.amount - debtPrice.amount);
  });
  it('should multiply a price by a factor', () => {
    expect(price.multipliedBy(10).amount).to.equal(price.amount * 10);
    expect(secondPrice.multipliedBy(5).amount).to.equal(secondPrice.amount * 5);
    expect(freePrice.multipliedBy(10).amount).to.equal(0);
    expect(debtPrice.multipliedBy(10).amount).to.equal(debtPrice.amount * 10);
  });
  it('should divide a price by a factor', () => {
    expect(price.dividedBy(10).amount).to.equal(price.amount / 10);
    expect(secondPrice.dividedBy(5).amount).to.equal(secondPrice.amount / 5);
    expect(freePrice.dividedBy(10).amount).to.equal(0);
    expect(debtPrice.dividedBy(10).amount).to.equal(debtPrice.amount / 10);
  });
  it('should convert a price from a currency to other', () => {
    const pesosToDollars = price.convertToCurrency(USDollars, 1 / 20);
    expect(pesosToDollars.currency).to.deep.equal(USDollars);
    expect(pesosToDollars.amount).to.equal(price.amount / 20);
  });
});
