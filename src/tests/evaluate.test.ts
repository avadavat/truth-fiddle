import { QueryPermutation } from '../model/evaluator/QueryPermutation';
import { evaluate } from '../model/evaluator/evaluate';
import { parse } from '../model/parser';

describe('simple query permutation tests', () => {
  const testCases: {expression: string, truthTable: any[]}[] = [
    {
      expression: 'p and q', 
      truthTable: [
        ['p', 'q'],
        [false, false, false],
        [false, true, false],
        [true, false, false],
        [true, true, true]
      ]
    },
    // TODO: re-enable after fix
    // {
    //   expression: 'not p and q',
    //   truthTable: [
    //     ['p', 'q'],
    //     [false, false, false],
    //     [false, true, true],
    //     [true, false, false],
    //     [true, true, false]
    //   ]
    // },
    {
      expression: 'p or q',
      truthTable: [
        ['p', 'q'],
        [false, false, false],
        [false, true, true],
        [true, false, true],
        [true, true, true]
      ]
    },
    // TODO: re-enable after fix
    // {
    //   expression: 'p xor q',
    //   truthTable: [
    //     ['p', 'q'],
    //     [false, false, false],
    //     [false, true, true],
    //     [true, false, true],
    //     [true, true, false]
    //   ]
    // },
    {
      expression: 'p and not q',
      truthTable: [
        ['p', 'q'],
        [false, false, false],
        [false, true, false],
        [true, false, true],
        [true, true, false]
      ]
    },
    {
      expression: 'p or not q',
      truthTable: [
        ['p', 'q'],
        [false, false, true],
        [false, true, false],
        [true, false, true],
        [true, true, true]
      ]
    },
    // TODO: re-enable after fix
    // {
    //   expression: 'not p or q',
    //   truthTable: [
    //     ['p', 'q'],
    //     [false, false, true],
    //     [false, true, true],
    //     [true, false, false],
    //     [true, true, true]
    //   ]
    // },
    // TODO: re-enable after fix
    // {
    //   expression: 'not p and not q',
    //   truthTable: [
    //     ['p', 'q'],
    //     [false, false, true],
    //     [false, true, false],
    //     [true, false, false],
    //     [true, true, false]
    //   ]
    // },
    {
      expression: 'p and q and s',
      truthTable: [
        ['p', 'q', 's'],
        [false, false, false, false],
        [false, false, true, false],
        [false, true, false, false],
        [false, true, true, false],
        [true, false, false, false],
        [true, false, true, false],
        [true, true, false, false],
        [true, true, true, true]
      ]
    },
    {
      expression: 'p and q and not s',
      truthTable: [
        ['p', 'q', 's'],
        [false, false, false, false],
        [false, false, true, false],
        [false, true, false, false],
        [false, true, true, false],
        [true, false, false, false],
        [true, false, true, false],
        [true, true, false, true],
        [true, true, true, false]
      ]
    },
    // TODO: re-enable after fix
    // {
    //   expression: 'p and not q and s',
    //   truthTable: [
    //     ['p', 'q', 's'],
    //     [false, false, false, false],
    //     [false, false, true, false],
    //     [false, true, false, false],
    //     [false, true, true, false],
    //     [true, false, false, false],
    //     [true, false, true, true],
    //     [true, true, false, false],
    //     [true, true, true, false]
    //   ]
    // },
    {
      expression: 'p and not (q and s)',
      truthTable: [
        ['p', 'q', 's'],
        [false, false, false, false],
        [false, false, true, false],
        [false, true, false, false],
        [false, true, true, false],
        [true, false, false, true],
        [true, false, true, true],
        [true, true, false, true],
        [true, true, true, false]
      ]
    },
    // TODO: re-enable after fix
    // {
    //   expression: 'not p and q and s',
    //   truthTable: [
    //     ['p', 'q', 's'],
    //     [false, false, false, false],
    //     [false, false, true, false],
    //     [false, true, false, false],
    //     [false, true, true, true],
    //     [true, false, false, false],
    //     [true, false, true, false],
    //     [true, true, false, false],
    //     [true, true, true, false]
    //   ]
    // },
  ]
  testCases.forEach((testCase) => {
    it('generates correct query permutations for ' + testCase.expression, () => {
      const expectedResult = buildExpectedResultFromTable(testCase.truthTable);
      expect(evaluate(parse(testCase.expression))).toStrictEqual(expectedResult);
    });
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
 *   Remaining 2^n rows (of length n+1) are the expected boolean values of the truth table
 * @returns The expected return from the evaluate function
*/
function buildExpectedResultFromTable(table: any[][]): QueryPermutation[] {
  const result: QueryPermutation[] = [];
  const variableNames: string[] = table[0];
  assert(table.length-1 === Math.pow(2, variableNames.length), 
    "Expected number of rows to equal 2 ^ the number of variables");
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