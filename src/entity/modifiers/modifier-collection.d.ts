import Collection from '../../utils/collection/collection';
import Modifier from './modifier';
export default class ModifierCollection extends Collection<Modifier> {
    constructor();
    add(...modifiers: Modifier[]): void;
    remove(id: string): void;
    removeAll(): void;
    setValue(id: string, value: number): void;
    activate(id: string): void;
    deactivate(id: string): void;
    getSum(): number;
    private _bindModifierEvents(modifier);
    private _unbindModifierEvents(id);
    static fromArray(modifiers: Modifier[]): ModifierCollection;
}
