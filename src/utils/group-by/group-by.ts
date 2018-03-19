import IIndexedByString from '../collection/indexed-by-string.i';
import IGroupCriteria from './group-criteria.i';
import IGrouping from './grouping.i';
import ITransform from './transform.i';

export function group<T>(
  array: T[], 
  criteria: IGroupCriteria<T>,
): IGrouping<T> {
  const result: IGrouping<T> = {};

  array.forEach((item) => {
    const grouping = criteria(item);
    if (!(grouping in result)) {
      result[grouping] = [item];
    } else {
      result[grouping].push(item);
    }
  });

  return result;
}

export function groupAndMap<T, R>(
  array: T[], 
  criteria: IGroupCriteria<T>,
  transform: ITransform<T, R>,
): IGrouping<R> {
  const result: IGrouping<R> = {};

  array.forEach((item) => {
    const grouping = criteria(item);
    if (!(grouping in result)) {
      result[grouping] = [transform(item)];
    } else {
      result[grouping].push(transform(item));
    }
  });

  return result;
}