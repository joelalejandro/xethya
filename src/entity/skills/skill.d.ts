import { Attribute } from '../attributes/attribute';
import Modifier from '../modifiers/modifier';
import IHasAttributes from '../attributes/has-attributes.i';
import AttributeCollection from '../attributes/attribute-collection';
import IHasModifiers from '../modifiers/has-modifiers.i';
import ModifierCollection from '../modifiers/modifier-collection';
import XethyaObject from '../../base/object';
import { SkillThrowResult } from '../../dice/throws/skill-throw-result';
export declare type SkillSettings = {
    id: string;
    owner?: XethyaObject;
    attributes?: Attribute[];
    modifiers?: Modifier[];
    primaryAttribute?: string | Attribute;
};
export declare class Skill extends XethyaObject implements IHasAttributes, IHasModifiers {
    attributes: AttributeCollection;
    modifiers: ModifierCollection;
    protected _id: string;
    protected _primaryAttribute?: Attribute;
    constructor({id, owner, attributes, modifiers, primaryAttribute}: SkillSettings);
    private _setPrimaryAttribute(primaryAttribute);
    primaryAttribute: Attribute | undefined;
    readonly id: string;
    readonly value: number;
    use(): SkillThrowResult;
}
