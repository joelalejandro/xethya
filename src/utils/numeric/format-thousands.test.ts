import 'mocha';
import { expect } from 'chai';

import formatThousands from './format-thousands';

describe('Utils.Numeric.FormatThousands', () => {
  it('should not format a single-digit number', () => {
    expect(formatThousands(1, '.')).to.equal('1');
  });
  it('should not format a two-digit number', () => {
    expect(formatThousands(22, '.')).to.equal('22');
  });
  it('should not format a three-digit number', () => {
    expect(formatThousands(333, '.')).to.equal('333');
  });
  it('should format a four-digit number', () => {
    expect(formatThousands(4444, '.')).to.equal('4.444');
  });
  it('should format an eleven-digit number', () => {
    expect(formatThousands(12345678901, '.')).to.equal('12.345.678.901');
  });
});
