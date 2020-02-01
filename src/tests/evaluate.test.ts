import { QueryPermutation } from '../model/evaluator/QueryPermutation';
import { evaluate } from '../model/evaluator/evaluate';
import { parse } from '../model/parser';

describe('simple query permutation tests', () => {
  it('generates correct query permutations for "p and q"', () => {
    const expectedResult: QueryPermutation[] = 
      buildExpectedResultFromTable([
          ['p', 'q'],
          [false, false, false],
          [false, true, false],
          [true, false, false],
          [true, true, true]
        ]);

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

/**
 * Helper function for building expected results more concisely
 * @param table - A 2-dimensional array. 
 *   First ("header") row is the list of variables of length n. 
 *   Remaining n^2 rows (of length n+1) are the expected boolean values of the truth table
 * @returns The expected return from the evaluate function
*/
function buildExpectedResultFromTable(table: any[][]): QueryPermutation[] {
  const result: QueryPermutation[] = [];
  const variableNames: string[] = table[0];
  assert(table.length-1 === Math.pow(variableNames.length,2), 
    "Expected number of rows to equal the square of the number of variables");
  for (let row of table.slice(1)) {
    const expressionOutput: boolean = row[row.length-1];
    const expressionInputs: boolean[] = row.slice(0,row.length-1);
    assert(variableNames.length === expressionInputs.length, 
      "Expected number of variables to equal number of inputs.");
    const mapValues: [string, boolean][] = []
    for (let i = 0; i < variableNames.length; i++) {
      mapValues.push([variableNames[i], expressionInputs[i]]);
    }
    result.push({
      queryParameters: new Map<string, boolean>(mapValues),
      value: row[row.length-1]
    })
  }
  return result;
}

function assert(condition: boolean, message: string) {
    if (!condition) {
        throw new Error('Assertion failed: ' + message);
    }
}