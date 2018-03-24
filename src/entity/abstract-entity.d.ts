import XethyaObject from '../base/object';
import IEntity from './entity.i';
import AttributeCollection from './attributes/attribute-collection';
import ModifierCollection from './modifiers/modifier-collection';
import { Attribute } from './attributes/attribute';
import Modifier from './modifiers/modifier';
export declare const enum MoralAlignments {
    CHAOTIC_GOOD = "chaotic:good",
    CHAOTIC_NEUTRAL = "chaotic:neutral",
    CHAOTIC_EVIL = "chaotic:evil",
    NEUTRAL_GOOD = "neutral:good",
    NEUTRAL_NEUTRAL = "neutral:neutral",
    NEUTRAL_EVIL = "neutral:evil",
    LAWFUL_GOOD = "lawful:good",
    LAWFUL_NEUTRAL = "lawful:neutral",
    LAWFUL_EVIL = "lawful:evil",
}
export interface IEntitySettings {
    id: string;
    name: string;
    volatile: false;
    attributes: Attribute[];
    modifiers: Modifier[];
}
export declare abstract class AbstractEntity extends XethyaObject implements IEntity {
    protected readonly _id: string;
    protected _name: string;
    protected readonly _volatile: boolean;
    protected readonly _attributes: AttributeCollection;
    protected readonly _modifiers: ModifierCollection;
    constructor({id, name, volatile, attributes, modifiers}?: IEntitySettings);
    readonly id: string;
    name: string;
    readonly volatile: boolean;
    readonly attributes: AttributeCollection;
    readonly modifiers: ModifierCollection;
}
