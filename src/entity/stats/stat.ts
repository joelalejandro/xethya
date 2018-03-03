import { Attribute } from '../attributes/attribute';
import AttributeCollection from '../attributes/attribute-collection';
import IHasAttributes from '../attributes/has-attributes.i';
import IStatCalculator from './stat-calculator.i';

export default class Stat extends Attribute implements IHasAttributes {
  attributes: AttributeCollection;

  private _calculateStat: IStatCalculator;
  private _lastCalculatedValue: number = 0;

  constructor(id: string, statCalculator: IStatCalculator) {
    super({ id });

    this.attributes = new AttributeCollection();

    this.modifiers.remove('base');
    this._calculateStat = statCalculator;

    this.attributes.on('change:attribute:value', this._valueChanged.bind(this));
  }

  private _valueChanged(): void {
    this.emit('change:value', {
      previousValue: this._lastCalculatedValue,
      newValue: this.value,
    });
  }

  get value(): number {
    const value = this._calculateStat(this);

    if (this._lastCalculatedValue !== value) {
      this.emit('change:value', {
        previousValue: this._lastCalculatedValue,
        newValue: value,
      });
      this._lastCalculatedValue = value;
    }

    return value;
  } 
}