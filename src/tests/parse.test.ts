import { parse } from '../model/parser/parse';

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
  it('evaluates "p OR OR q" to throw an error', () => {
    expect(() => parse('p OR OR q')).toThrowError();
  });

  it('evaluates "not p" not to throw an error', () => {
    expect(() => parse('not p')).not.toThrowError();
  });

  it('evaluates "not" to throw an error', () => {
    expect(() => parse('not')).toThrowError();
  });

  it('evaluates "( not ) or ( not )" to throw an error', () => {
    expect(() => parse('( not ) or ( not )')).toThrowError();
  });
});

describe('expressions with invalid tokens', () => {
  it('evaluates "(p AND {q}) OR r" to throw an error', () => {
    expect(() => parse('(p AND {q}) OR r')).toThrowError();
  });
});
