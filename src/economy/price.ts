import IPrice from './price.i';
import ICurrency from './currency.i';
import formatThousands from '../utils/numeric/format-thousands';

export default class Price implements IPrice {
  readonly amount: number;
  readonly currency: ICurrency;
  readonly formattedPrice: string;

  constructor(amount: number, currency: ICurrency) {
    this.amount = amount;
    this.currency = currency;
    this.formattedPrice = this.format();
  }

  format() {
    const dataKeys = Object.keys(this.currency).filter(key => key !== 'format');
    let formattedPrice = this.currency.format;

    dataKeys.forEach((dataKey) => {
      formattedPrice = formattedPrice.replace(`{${dataKey}}`, this.currency[dataKey] as string);
    });

    const integerAmount = Math.ceil(this.amount);
    const splittedInteger = formatThousands(integerAmount, this.currency.thousandsSeparator);
    const decimalString = this.amount.toFixed(this.currency.decimalPlaces).substr(-this.currency.decimalPlaces);

    formattedPrice = formattedPrice.replace(`{value}`,
      splittedInteger +
      this.currency.decimalSeparator +
      decimalString
    );

    return formattedPrice;
  }

  toString() {
    return this.formattedPrice;
  }

  plus(price: Price): Price {
    if (this.currency !== price.currency) {
      throw new Error('Price#plus: cannot mix currencies');
    }

    return new Price(this.amount + price.amount, this.currency);
  }

  minus(price: Price): Price {
    if (this.currency !== price.currency) {
      throw new Error('Price#plus: cannot mix currencies');
    }

    return new Price(this.amount - price.amount, this.currency);
  }

  multipliedBy(factor: number): Price {
    return new Price(this.amount * factor, this.currency);
  }

  dividedBy(factor: number): Price {
    return new Price(this.amount / factor, this.currency);
  }

  convertToCurrency(newCurrency: ICurrency, exchangeRate: number): Price {
    return new Price(this.amount * exchangeRate, newCurrency);
  }
}
