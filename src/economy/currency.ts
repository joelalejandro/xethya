import ICurrency from './currency.i';
import ICurrencySettings from './currency-settings.i';

export default class Currency implements ICurrency {
  [index: string]: string | number;

  readonly symbol: string;
  readonly decimalPlaces: number;
  readonly thousandsSeparator: string;
  readonly decimalSeparator: string;
  readonly name: string;
  readonly shortName: string;
  readonly format: string;

  constructor({
    symbol,
    decimalPlaces,
    thousandsSeparator,
    decimalSeparator,
    name,
    shortName,
    format,
  }: ICurrencySettings) {
    this.symbol = symbol;
    this.decimalPlaces = decimalPlaces;
    this.thousandsSeparator = thousandsSeparator;
    this.decimalSeparator = decimalSeparator;
    this.name = name;
    this.shortName = shortName;
    this.format = format;
  }
}
