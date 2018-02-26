import assert from '../../utils/assert/assert';
import Eventable from '../../base/eventable';
import BaseModifier from '../modifiers/base-modifier';
import Modifier from '../modifiers/modifier';
import ModifierCollection from '../modifiers/modifier-collection';
import IHasModifiers from '../modifiers/has-modifiers.i';
import Range from '../../utils/range/range';
import IRangeable from '../../utils/range/rangeable.i';

export type AttributeSettings = {
  id: string,
  initialValue?: number,
  valueRange?: Range,
};

export class Attribute extends Eventable implements IHasModifiers {
  modifiers: ModifierCollection;
  
  private _valueRange?: Range;
  private _rawValue: number = 0;
  private _id: string = '';

  constructor({ 
    id, 
    initialValue = 0, 
    valueRange = undefined 
  }: AttributeSettings) {
    super();
    
    this.modifiers = new ModifierCollection();
    this.id = id;
    this._rawValue = initialValue;

    if (valueRange) {
      this._valueRange = valueRange;
    }

    this.modifiers.add(new BaseModifier());
    this._updateBaseModifierValue();
  }

  private _updateBaseModifierValue(): void {
    this.modifiers.setValue('base', this._rawValue);
  }

  get id() {
    return this._id;
  }

  set id(newId: string) {
    assert(newId !== '', 'Attribute#set[id]: cannot be an empty String');

    this._id = newId;
  }

  get rawValue(): number {
    return this._rawValue;
  }

  set rawValue(newValue: number) {
    const range = this._valueRange;

    if (range) {
      assert(range.includes(newValue),
        `Attribute#set[value]: value is out of range (must be within ${range.toString()})`);
    }

    const previousValue = this._rawValue;

    if (previousValue !== newValue) {
      this.emit('before:change:value', { previousValue, newValue });
      this._rawValue = newValue;
      this._updateBaseModifierValue();
      this.emit('change:value', this);
    }
  }

  get value(): number {
    return this.rawValue + this.modifiers.getSum();
  }

  get baseModifierValue(): number {
    const modifier = this.modifiers.get('base') as Modifier;
    return modifier.value;
  }

  toString(): string {
    const modifierSum: number = this.modifiers.getSum();
    const sign: string = modifierSum >= 0 ? '+' : '';
    return `${this.rawValue.toString()} (${sign}${modifierSum.toString()})`;
  }
}