import IQuery from './query.i';

export default interface ICollection<T> {
  indexName: string;
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