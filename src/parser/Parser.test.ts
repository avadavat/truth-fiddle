import { parse } from './Parser';

describe('simple variable extraction tests', () => {
  it('evaluates "p AND q" not to throw an error', () => {
    expect(parse('p AND q')).toEqual(['p', 'q']);
  });

  it('evaluates "p AND q OR r" not to throw an error', () => {
    expect(parse('p AND q OR r')).toEqual(['p', 'q', 'r']);
  });
});
