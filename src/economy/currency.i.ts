export default interface ICurrency {
  [index: string]: string | number;

  readonly symbol: string;
  readonly decimalPlaces: number;
  readonly thousandsSeparator: string;
  readonly decimalSeparator: string;
  readonly name: string;
  readonly shortName: string;
  readonly format: string;
}
