import Stat from './stat';
import Collection from '../../utils/collection/collection';
export default class StatCollection extends Collection<Stat> {
    constructor();
    add(...stats: Stat[]): void;
    remove(id: string): void;
    removeAll(): void;
    private _bindStatEvents(stat);
    private _unbindStatEvents(id);
    static fromArray(stats: Stat[]): StatCollection;
}
