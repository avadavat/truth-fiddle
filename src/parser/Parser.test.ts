import { isValid } from '.';

describe('simple expression tests', () => {
  it('evaluates "p AND q" to be valid', () => {
    expect(isValid('p AND q')).toBe(true);
  });

  it('evaluates "p AND q OR r" to be valid', () => {
    expect(isValid('p AND q OR r')).toBe(true);
  });

  it('evaluates "p q" to be invalid', () => {
    expect(isValid('p q')).toBe(false);
  });

  it('evaluates "p AND q OR" to be invalid', () => {
    expect(isValid('p AND q OR')).toBe(false);
  });
});

describe('expressions with parenthesis', () => {
  it('evaluates "(p AND q) OR r" to be valid', () => {
    expect(isValid('(p AND q) OR r')).toBe(true);
  });

  it('evaluates "(p AND (q OR r))" to be valid', () => {
    expect(isValid('(p AND (q OR r))')).toBe(true);
  });

  it('evaluates "(p AND (q OR r)" to be invalid', () => {
    expect(isValid('(p AND (q OR r)')).toBe(false);
  });
});
