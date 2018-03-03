import AbstractCollection from './abstract-collection';

export default class Collection<T> extends AbstractCollection<T> {
  constructor(public indexName: string) {
    super(indexName);
  }

  static fromArrayOf<T>(items: T[], indexName: string) {
    const collection: Collection<T> = new Collection<T>(indexName);
    
    collection.add(...items);
    
    return collection;
  }  
}