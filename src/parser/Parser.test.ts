import { parse } from './Parser';

describe('variable extraction tests', () => {
  const exp1 = 'p AND q';
  it(`extracts [p, q] from "${exp1}"`, () => {
    expect(parse(exp1)).toEqual(['p', 'q']);
  });

  const exp2 = 'p AND q OR r';
  it(`extracts [p, q, r] from "${exp2}"`, () => {
    expect(parse(exp2)).toEqual(['p', 'q', 'r']);
  });

  const exp3 = ' ( p AND (q OR r))';
  it(`extracts [p, q, r] from "${exp3}"`, () => {
    expect(parse(exp3)).toEqual(['p', 'q', 'r']);
  });

  const exp4 = ' ( p AND (q OR r) AND p OR q)';
  it(`extracts [p, q, r] from "${exp4}"`, () => {
    expect(parse(exp4)).toEqual(['p', 'q', 'r']);
  });
});
