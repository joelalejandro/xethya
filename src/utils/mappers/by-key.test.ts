import 'mocha';
import { expect } from 'chai';

import byKey from './by-key';
import Faction from '../../relationships/faction';

const listOfFactions = [
  new Faction({ id: 'foo', name: 'Foo' }),
  new Faction({ id: 'bar', name: 'Bar' }),
];

describe('Utils.Mappers.ByKey', () => {
  it('should map an array by an attribute', () => {
    expect(listOfFactions.map(byKey('name'))).to.deep.equal(['Foo', 'Bar']);
  });
});
