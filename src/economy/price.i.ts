import ICurrency from './currency.i';

export default interface IPrice {
  readonly currency: ICurrency;
  readonly amount: number;
  readonly formattedPrice: string;

  format(): string;
  toString(): string;

  plus(price: IPrice): IPrice;
  minus(price: IPrice): IPrice;
  multipliedBy(factor: number): IPrice;
  dividedBy(factor: number): IPrice;

  convertToCurrency(newCurrency: ICurrency, exchangeRate: number): IPrice;
}
