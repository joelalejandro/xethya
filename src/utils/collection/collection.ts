import AbstractCollection from './abstract-collection';

export default class Collection<T> extends AbstractCollection<T> {
  constructor(public indexName: string) {
    super(indexName);
  }
}