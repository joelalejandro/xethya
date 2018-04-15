import 'mocha';
import { expect } from 'chai';

import Currency from './currency';

describe('Economy.Currency', () => {
  it('should instantiate with the expected input', () => {
    const currency = new Currency({
      symbol: '$',
      decimalPlaces: 2,
      thousandsSeparator: '.',
      decimalSeparator: ',',
      name: 'Pesos Argentinos',
      shortName: 'ARS',
      format: '{symbol} {value}',
    });

    expect(currency.symbol).to.equal('$');
    expect(currency.decimalPlaces).to.equal(2);
    expect(currency.thousandsSeparator).to.equal('.');
    expect(currency.decimalSeparator).to.equal(',');
    expect(currency.name).to.equal('Pesos Argentinos');
    expect(currency.shortName).to.equal('ARS');
    expect(currency.format).to.equal('{symbol} {value}');
  });
});
