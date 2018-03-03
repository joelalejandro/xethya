import 'mocha';
import { expect } from 'chai';

import { BaseModifierCalculator } from './base-modifier-calculator';

describe('Entity.BaseModifierCalculator', () => {
  it('should calculate the base modifier value with a positive result', () => {
    expect(BaseModifierCalculator(20)).to.equal(5);
  });
  it('should calculate the base modifier value with a negative result', () => {
    expect(BaseModifierCalculator(0)).to.equal(-5);
  });
  it('should calculate the base modifier value with a rounded-down result', () => {
    expect(BaseModifierCalculator(7.5)).to.equal(-2);
  });
});