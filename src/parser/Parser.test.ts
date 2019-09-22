import { parse, extractVariables } from './Parser';

describe('simple error handling tests', () => {
  it('evaluates "p AND q" not to throw an error', () => {
    expect(() => parse('p AND q')).not.toThrowError();
  });

  it('evaluates "p and q OR r" not to throw an error', () => {
    expect(() => parse('p and q OR r')).not.toThrowError();
  });

  it('evaluates "p q" to throw an error', () => {
    expect(() => parse('p q')).toThrowError();
  });

  it('evaluates "p AND q OR" to throw an error', () => {
    expect(() => parse('p AND q OR')).toThrowError();
  });
});

describe('parenthesis error handling tests', () => {
  it('evaluates "(p AND q) OR r" not to throw an error', () => {
    expect(() => parse('(p AND q) OR r')).not.toThrowError();
  });

  it('evaluates "(p AND (q OR r))" not to throw an error', () => {
    expect(() => parse('(p AND (q OR r))')).not.toThrowError();
  });

  it('evaluates "(p AND (q OR r)" to throw an error', () => {
    expect(() => parse('(p AND (q OR r)')).toThrowError();
  });
});

describe('special keyword error handling tests', () => {
  it('evalutes "p OR OR q" to throw an error', () => {
    expect(() => parse('p OR OR q')).toThrowError();
  });

  it('evaluates "not p" not to throw an error', () => {
    expect(() => parse('not p')).not.toThrowError();
  });

  // TODO: Reenable once we fix this grammar issue.
  it.skip('evalutes "not" to throw an error', () => {
    expect(() => parse('not')).toThrowError();
  });

  // TODO: Reenable once we fix this grammar issue.
  it.skip('evalutes "( not ) or ( not )" to throw an error', () => {
    expect(() => parse('( not ) or ( not )')).toThrowError();
  });
});

describe('expressions with invalid tokens', () => {
  it('evaluates "(p AND {q}) OR r" to throw an error', () => {
    expect(() => parse('(p AND {q}) OR r')).toThrowError();
  });
});

describe('extractVariables tests', () => {
  const exp1 = 'p AND q';
  it(`extracts [p, q] from "${exp1}"`, () => {
    expect(extractVariables(exp1)).toEqual(['p', 'q']);
  });

  const exp2 = 'p AND q OR r';
  it(`extracts [p, q, r] from "${exp2}"`, () => {
    expect(extractVariables(exp2)).toEqual(['p', 'q', 'r']);
  });

  const exp3 = ' ( p AND (q OR r))';
  it(`extracts [p, q, r] from "${exp3}"`, () => {
    expect(extractVariables(exp3)).toEqual(['p', 'q', 'r']);
  });

  const exp4 = ' ( p AND (q OR r) AND p OR q)';
  it(`extracts [p, q, r] from "${exp4}"`, () => {
    expect(extractVariables(exp4)).toEqual(['p', 'q', 'r']);
  });

  const exp5 = ' ( p xor (q OR r) xor p OR q)';
  it(`extracts [p, q, r] from "${exp5}"`, () => {
    expect(extractVariables(exp5)).toEqual(['p', 'q', 'r']);
  });
});
