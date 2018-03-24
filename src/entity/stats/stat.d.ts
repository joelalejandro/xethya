import { Attribute } from '../attributes/attribute';
import AttributeCollection from '../attributes/attribute-collection';
import IHasAttributes from '../attributes/has-attributes.i';
import IStatCalculator from './stat-calculator.i';
export default class Stat extends Attribute implements IHasAttributes {
    attributes: AttributeCollection;
    private _calculateStat;
    private _lastCalculatedValue;
    constructor(id: string, statCalculator: IStatCalculator);
    private _valueChanged();
    readonly value: number;
}
