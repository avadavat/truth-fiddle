import { QueryPermutation } from '../model/evaluator/QueryPermutation';
import { evaluate } from '../model/evaluator/evaluate';
import { parse } from '../model/parser';

describe('simple query permutation tests', () => {
  it('generates correct query permutations for "p and q"', () => {
    const expectedResult: QueryPermutation[] = [
      {
        queryParameters: {
          p: false,
          q: false,
        },
        value: false,
      },
      {
        queryParameters: {
          p: false,
          q: true,
        },
        value: false,
      },
      {
        queryParameters: {
          p: true,
          q: false,
        },
        value: false,
      },
      {
        queryParameters: {
          p: true,
          q: true,
        },
        value: true,
      },
    ];

    expect(evaluate(parse('p and q'))).toStrictEqual(expectedResult);
  });
});

describe('generates correct number of permutations', () => {
  it('generates 4 permutations for 2 unique variables', () => {
    expect(evaluate(parse('p and q'))).toHaveLength(4);
  });

  it('generates 16 permutations for 4 unique variables', () => {
    expect(evaluate(parse('p and q or r xor s'))).toHaveLength(16);
  });

  it('generates 16 permutations for 4 unique variables', () => {
    expect(evaluate(parse('p and q or r xor s or p or q'))).toHaveLength(16);
  });
});
