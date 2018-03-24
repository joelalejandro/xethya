import IIndexedByString from './indexed-by-string.i';
import Eventable from '../../base/eventable';
import ICollection from './collection.i';
import IQuery from './query.i';
declare abstract class AbstractCollection<T extends {
    [index: string]: any;
}> extends Eventable implements ICollection<T> {
    indexName: string;
    protected _list: IIndexedByString<T>;
    constructor(indexName: string);
    readonly count: number;
    get(id: string): T | undefined;
    getAll(): T[];
    getAllKeys(): string[];
    where(condition: IQuery<T>): T[];
    contains(id: string): boolean;
    add(...items: T[]): void;
    remove(id: string): void;
    removeAll(): void;
}
export default AbstractCollection;
