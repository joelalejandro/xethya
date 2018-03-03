import { Attribute } from '../attributes/attribute';
import Modifier from '../modifiers/modifier';
import IHasAttributes from '../attributes/has-attributes.i';
import AttributeCollection from '../attributes/attribute-collection';
import IHasModifiers from '../modifiers/has-modifiers.i';
import ModifierCollection from '../modifiers/modifier-collection';
import XethyaObject from '../../base/object';
import assert from '../../utils/assert/assert';
import SkillThrow from '../../dice/throws/skill-throw';
import { SkillThrowResult } from '../../dice/throws/skill-throw-result';
import { DiceThrowTypes } from '../../dice/throws/dice-throw';
import { ChanceThrow } from '../../dice/throws/chance-throw';

export type SkillSettings = {
  id: string;
  owner?: XethyaObject;
  attributes?: Attribute[],
  modifiers?: Modifier[],
  primaryAttribute?: string | Attribute,
}

export class Skill extends XethyaObject implements IHasAttributes, IHasModifiers {
  attributes: AttributeCollection;
  modifiers: ModifierCollection;
  
  protected _id: string;
  protected _primaryAttribute?: Attribute;

  constructor({
    id,
    owner = undefined,
    attributes = [],
    modifiers = [],
    primaryAttribute = ''
  }: SkillSettings) {
    super();

    this._id = id;
    this.attributes = AttributeCollection.fromArray(attributes);
    this.modifiers = ModifierCollection.fromArray(modifiers);

    if (this.attributes.count > 0) {
      this._setPrimaryAttribute(primaryAttribute);  
    }
  }

  private _setPrimaryAttribute(primaryAttribute: string | Attribute) {
    const isAttributeID = typeof primaryAttribute === 'string';
    const attributeID: string = isAttributeID ? primaryAttribute as string : (primaryAttribute as Attribute).id;
    
    assert(this.attributes.contains(attributeID),
      'Skill#constructor: primaryAttribute must be defined in attributes array');
    
    this._primaryAttribute = this.attributes.get(attributeID) as Attribute;
  }

  get primaryAttribute(): Attribute | undefined {
    return this._primaryAttribute;
  }

  set primaryAttribute(newPrimaryAttribute: Attribute | undefined) {
    this._primaryAttribute = newPrimaryAttribute;
  }

  get id() {
    return this._id;
  }

  get value() {
    return (this._primaryAttribute as Attribute).value;
  }

  use(): SkillThrowResult {
    this.emit('before:use', this);

    const skillThrow = new SkillThrow(this);
    const result = skillThrow.roll();

    if (result.throwType === DiceThrowTypes.FAILURE) {
      result.failureRoll = new ChanceThrow().roll();
    }

    this.emit('use', this);

    return result;
  }
}