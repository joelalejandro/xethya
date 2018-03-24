import IGroupCriteria from './group-criteria.i';
import IGrouping from './grouping.i';
import ITransform from './transform.i';
export declare function group<T>(array: T[], criteria: IGroupCriteria<T>): IGrouping<T>;
export declare function groupAndMap<T, R>(array: T[], criteria: IGroupCriteria<T>, transform: ITransform<T, R>): IGrouping<R>;
