import 'mocha';
import chai from 'chai';
import spies from 'chai-spies';

import BaseModifier from './base-modifier';
import { BaseModifierCalculator, IBaseModifierCalculator } from './base-modifier-calculator';

chai.use(spies);
const expect = chai.expect;

describe('Entity.BaseModifier', () => {
  it('should create a Modifier called `base`', () => {
    const base = new BaseModifier();
    expect(base.id).to.equal('base');
  });
  it('should call the default calculator when setting the value', () => {
    const base = new BaseModifier();
    const spy = chai.spy.on(BaseModifierCalculator);
    base.value = 20;
    expect(spy).to.have.been.called;
    expect(base.value).to.equal(BaseModifierCalculator(20));
  });
  it('should call a custom calculator when setting the value', () => {
    const myCalculator: IBaseModifierCalculator = (value: number) => {
      return value / 2;
    };
    const spy = chai.spy.on(myCalculator);
    const base = new BaseModifier(myCalculator);
    base.value = 20;
    expect(spy).to.have.been.called;
    expect(base.value).to.equal(myCalculator(20));
  });
});