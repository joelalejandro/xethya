import 'mocha';
import { expect } from 'chai';

import { group, groupAndMap } from './group-by';
import IGrouping from './grouping.i';
import IGroupCriteria from './group-criteria.i';
import ITransform from './transform.i';

type GroupMock = {
  id: string;
  group: string;
};

type TransformedType = { id: string; };

const elements: GroupMock[] = [
  { id: 'alpha', group: 'one' },
  { id: 'gamma', group: 'two' },
  { id: 'delta', group: 'three' },
  { id: 'beta', group: 'one' },
];

const expectedGrouping: IGrouping<GroupMock> = {
  one: [
    { id: 'alpha', group: 'one' },
    { id: 'beta', group: 'one' },
  ],
  two: [
    { id: 'gamma', group: 'two' },
  ],
  three: [
    { id: 'delta', group: 'three' },
  ],
};

const expectedTransformedGrouping: IGrouping<TransformedType> = {
  one: [
    { id: 'alpha' },
    { id: 'beta' },
  ],
  two: [
    { id: 'gamma' },
  ],
  three: [
    { id: 'delta' },
  ],
};

const groupCriteria: IGroupCriteria<GroupMock> = (element: GroupMock) => element.group;

const transformer: ITransform<GroupMock, TransformedType> = (element: GroupMock) => ({ id: element.id });

describe('Utils.GroupBy', () => {
  it('should build a grouping using a key', () => {
    expect(group<GroupMock>(elements, groupCriteria)).to.deep.equal(expectedGrouping);
  });
  it('should build a grouping using a key and returning a transformed type', () => {
    expect(groupAndMap<GroupMock, TransformedType>(
      elements, groupCriteria, transformer
    )).to.deep.equal(expectedTransformedGrouping);
  });
});