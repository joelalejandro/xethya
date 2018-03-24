import AbstractCollection from './abstract-collection';
export default class Collection<T> extends AbstractCollection<T> {
    indexName: string;
    constructor(indexName: string);
    static fromArrayOf<T>(items: T[], indexName: string): Collection<T>;
}
