import Eventable from '../../base/eventable';
import ModifierCollection from '../modifiers/modifier-collection';
import IHasModifiers from '../modifiers/has-modifiers.i';
import Range from '../../utils/range/range';
export declare type AttributeSettings = {
    id: string;
    initialValue?: number;
    valueRange?: Range;
};
export declare class Attribute extends Eventable implements IHasModifiers {
    modifiers: ModifierCollection;
    private _valueRange?;
    private _rawValue;
    private _id;
    constructor({id, initialValue, valueRange}: AttributeSettings);
    private _updateBaseModifierValue();
    id: string;
    rawValue: number;
    readonly value: number;
    readonly baseModifierValue: number;
    toString(): string;
}
