import Collection from '../../utils/collection/collection';
import { Attribute } from './attribute';
export default class AttributeCollection extends Collection<Attribute> {
    constructor();
    add(...attributes: Attribute[]): void;
    remove(id: string): void;
    removeAll(): void;
    setValue(id: string, value: number): void;
    getModifierSumForAll(): number;
    private _bindAttributeEvents(attribute);
    private _unbindAttributeEvents(id);
    static fromArray(attributes: Attribute[]): AttributeCollection;
}
