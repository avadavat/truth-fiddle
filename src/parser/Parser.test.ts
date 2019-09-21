import { assertIsValidExpression } from './Parser';

describe('simple expression tests', () => {
  it('evaluates "p AND q" not to throw an error', () => {
    expect(() => assertIsValidExpression('p AND q')).not.toThrowError();
  });

  it('evaluates "p AND q OR r" not to throw an error', () => {
    expect(() => assertIsValidExpression('p AND q OR r')).not.toThrowError();
  });

  // TODO: Re-enable when this test case is supported.
  it.skip('evaluates "p q" to throw an error', () => {
    expect(() => assertIsValidExpression('p q')).toThrowError();
  });

  // TODO: Re-enable when this test case is supported.
  it.skip('evaluates "p AND q OR" to throw an error', () => {
    expect(() => assertIsValidExpression('p AND q OR')).toThrowError();
  });
});

describe('expressions with parenthesis', () => {
  it('evaluates "(p AND q) OR r" not to throw an error', () => {
    expect(() => assertIsValidExpression('(p AND q) OR r')).not.toThrowError();
  });

  it('evaluates "(p AND (q OR r))" not to throw an error', () => {
    expect(() => assertIsValidExpression('(p AND (q OR r))')).not.toThrowError();
  });

  it('evaluates "(p AND (q OR r)" to throw an error', () => {
    expect(() => assertIsValidExpression('(p AND (q OR r)')).toThrowError();
  });
});

describe('expressions with invalid tokens', () => {
  it('evaluates "(p AND {q}) OR r" to throw an error', () => {
    expect(() => assertIsValidExpression('(p AND {q}) OR r')).toThrowError();
  });
});
