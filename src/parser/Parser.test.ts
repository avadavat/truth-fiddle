import { parse } from './Parser';

describe('variable extraction tests', () => {
  it('extracts [p, q] from "p AND q"', () => {
    expect(parse('p AND q')).toEqual(['p', 'q']);
  });

  it('extracts [p, q, r] from "p AND q OR r"', () => {
    expect(parse('p AND q OR r')).toEqual(['p', 'q', 'r']);
  });

  it('extracts [p, q, r] from " ( p AND (q OR r))"', () => {
    expect(parse('p AND q OR r')).toEqual(['p', 'q', 'r']);
  });
});
