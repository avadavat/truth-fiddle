import { evaluate } from './Evaluator';

describe('simple expression tests', () => {
  it('evaluates "TRUE AND TRUE" to be TRUE', () => {
    expect(evaluate('TRUE AND TRUE')).toBe(true);
  });

  it('evaluates "TRUE AND FALSE OR TRUE" to be TRUE', () => {
    expect(evaluate('TRUE AND FALSE OR TRUE')).toBe(true);
  });

  it('evaluates "TRUE AND FALSE" to be FALSE', () => {
    expect(evaluate('TRUE AND FALSE')).toBe(false);
  });

  it('evaluates "TRUE OR FALSE" to be TRUE', () => {
    expect(evaluate('TRUE OR FALSE')).toBe(true);
  });
});

describe('expressions with parenthesis', () => {
  it('evaluates "(FALSE AND TRUE) OR TRUE" to be TRUE', () => {
    expect(evaluate('(FALSE AND TRUE) OR TRUE')).toBe(true);
  });

  it('evaluates "(FALSE AND (TRUE OR TRUE))" to be FALSE', () => {
    expect(evaluate('(FALSE AND (TRUE OR TRUE))')).toBe(false);
  });

  it('evaluates "(TRUE AND (FALSE OR TRUE))" to be TRUE', () => {
    expect(evaluate('(TRUE AND (FALSE OR TRUE))')).toBe(true);
  });
});
