import assert from '../utils/assert/assert';
import XethyaObject from '../base/object';
import IEntity from './entity.i';
import AttributeCollection from './attributes/attribute-collection';
import ModifierCollection from './modifiers/modifier-collection';
import { Attribute } from './attributes/attribute';
import Modifier from './modifiers/modifier';

export const enum MoralAlignments {
  CHAOTIC_GOOD = 'chaotic:good',
  CHAOTIC_NEUTRAL = 'chaotic:neutral',
  CHAOTIC_EVIL = 'chaotic:evil',
  NEUTRAL_GOOD = 'neutral:good',
  NEUTRAL_NEUTRAL = 'neutral:neutral',
  NEUTRAL_EVIL = 'neutral:evil',
  LAWFUL_GOOD = 'lawful:good',
  LAWFUL_NEUTRAL = 'lawful:neutral',
  LAWFUL_EVIL = 'lawful:evil',
};

export interface IEntitySettings {
  id: string;
  name: string;
  volatile: false;
  attributes: Attribute[],
  modifiers: Modifier[],
};

export abstract class AbstractEntity extends XethyaObject implements IEntity {
  protected readonly _id: string;
  protected _name: string;
  protected readonly _volatile: boolean;
  protected readonly _attributes: AttributeCollection;
  protected readonly _modifiers: ModifierCollection;

  constructor({
    id,
    name = 'UnnamedEntity',
    volatile = false,
    attributes = [],
    modifiers = [],
  } = {} as IEntitySettings) {
    super();

    this._id = id;
    this._name = name;
    this._volatile = volatile;
    this._attributes = AttributeCollection.fromArray(attributes);
    this._modifiers = ModifierCollection.fromArray(modifiers);
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  set name(newName: string) {
    this._name = newName;
  }

  get volatile() {
    return this._volatile;
  }

  get attributes() {
    return this._attributes;
  }

  get modifiers() {
    return this._modifiers;
  }
}