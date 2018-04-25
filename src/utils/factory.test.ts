import 'mocha';
import { expect } from 'chai';

import Factory from './factory';
import Faction from '../relationships/faction';
import { Dice } from '../dice/dice';

describe('Utils.Factory', () => {
  it('should instantiate any object without arguments', () => {
    expect(Factory.create(Dice)).to.be.an.instanceof(Dice);
  });
  it('should instantiate any object with arguments', () => {
    expect(Factory.create(Faction, { id: 'test', name: 'test' })).to.be.an.instanceof(Faction);
  });
});
