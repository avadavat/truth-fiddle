import { QueryPermutation } from '../model/evaluator/QueryPermutation';
import { evaluate } from '../model/evaluator/evaluate';
import { parse } from '../model/parser';

describe('simple query permutation tests', () => {
  const testCases: {expression: string, variableNames: string[], truthTable: boolean[][]}[] = [
    {
      expression: 'p and q', 
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, false],
        [false, true, false],
        [true, false, false],
        [true, true, true]
      ]
    },
    {
      expression: 'p and notq', 
      variableNames: ['p', 'notq'],
      truthTable: [
        [false, false, false],
        [false, true, false],
        [true, false, false],
        [true, true, true]
      ]
    },
    {
      expression: 'not p and q',
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, false],
        [false, true, true],
        [true, false, false],
        [true, true, false]
      ]
    },
    {
      expression: 'p or q',
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, false],
        [false, true, true],
        [true, false, true],
        [true, true, true]
      ]
    },
    {
      expression: 'p xor q',
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, false],
        [false, true, true],
        [true, false, true],
        [true, true, false]
      ]
    },
    {
      expression: 'p ^ q',
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, false],
        [false, true, true],
        [true, false, true],
        [true, true, false]
      ]
    },
    {
      expression: 'p^ q',
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, false],
        [false, true, true],
        [true, false, true],
        [true, true, false]
      ]
    },
    {
      expression: 'p and not q',
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, false],
        [false, true, false],
        [true, false, true],
        [true, true, false]
      ]
    },
    {
      expression: 'p or not q',
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, true],
        [false, true, false],
        [true, false, true],
        [true, true, true]
      ]
    },
    {
      expression: 'not p or q',
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, true],
        [false, true, true],
        [true, false, false],
        [true, true, true]
      ]
    },
    {
      expression: 'not p xor q',
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, true],
        [false, true, false],
        [true, false, false],
        [true, true, true]
      ]
    },
    {
      expression: 'not p and not q',
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, true],
        [false, true, false],
        [true, false, false],
        [true, true, false]
      ]
    },
    {
      expression: 'p and q and s',
      variableNames: ['p', 'q', 's'],
      truthTable: [
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
      variableNames: ['p', 'q', 's'],
      truthTable: [
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
    {
      expression: 'p and not q and s',
      variableNames: ['p', 'q', 's'],
      truthTable: [
        [false, false, false, false],
        [false, false, true, false],
        [false, true, false, false],
        [false, true, true, false],
        [true, false, false, false],
        [true, false, true, true],
        [true, true, false, false],
        [true, true, true, false]
      ]
    },
    {
      expression: 'p and not (q and s)',
      variableNames: ['p', 'q', 's'],
      truthTable: [
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
    {
      expression: 'not p and q and s',
      variableNames: ['p', 'q', 's'],
      truthTable: [
        [false, false, false, false],
        [false, false, true, false],
        [false, true, false, false],
        [false, true, true, true],
        [true, false, false, false],
        [true, false, true, false],
        [true, true, false, false],
        [true, true, true, false]
      ]
    },
    {
      expression: 'p aND q', 
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, false],
        [false, true, false],
        [true, false, false],
        [true, true, true]
      ]
    },
    {
      expression: 'p Or q',
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, false],
        [false, true, true],
        [true, false, true],
        [true, true, true]
      ]
    },
    {
      expression: 'p',
      variableNames: ['p'],
      truthTable: [
        [false, false],
        [true, true],
      ]
    },
    {
      expression: 'not p',
      variableNames: ['p'],
      truthTable: [
        [false, true],
        [true, false],
      ]
    },
    {
      expression: 'nOt p',
      variableNames: ['p'],
      truthTable: [
        [false, true],
        [true, false],
      ]
    },
    {
      expression: 'NOT p',
      variableNames: ['p'],
      truthTable: [
        [false, true],
        [true, false],
      ]
    },
    {
      expression: '! p',
      variableNames: ['p'],
      truthTable: [
        [false, true],
        [true, false],
      ]
    },
    {
      expression: '~ p',
      variableNames: ['p'],
      truthTable: [
        [false, true],
        [true, false],
      ]
    },
    {
      expression: '~p',
      variableNames: ['p'],
      truthTable: [
        [false, true],
        [true, false],
      ]
    },
    {
      expression: 'p | q',
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, false],
        [false, true, true],
        [true, false, true],
        [true, true, true]
      ]
    },
    {
      expression: 'p || q',
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, false],
        [false, true, true],
        [true, false, true],
        [true, true, true]
      ]
    },
    {
      expression: 'p|q',
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, false],
        [false, true, true],
        [true, false, true],
        [true, true, true]
      ]
    },
    {
      expression: 'p & q', 
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, false],
        [false, true, false],
        [true, false, false],
        [true, true, true]
      ]
    },
    {
      expression: 'p && q', 
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, false],
        [false, true, false],
        [true, false, false],
        [true, true, true]
      ]
    },
    {
      expression: 'p &&q', 
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, false],
        [false, true, false],
        [true, false, false],
        [true, true, true]
      ]
    },
    {
      expression: 'p and q or s',
      variableNames: ['p', 'q', 's'],
      truthTable: [
        [false, false, false, false],
        [false, false, true, true],
        [false, true, false, false],
        [false, true, true, true],
        [true, false, false, false],
        [true, false, true, true],
        [true, true, false, true],
        [true, true, true, true]
      ]
    },
    {
      expression: '(p and q) or s',
      variableNames: ['p', 'q', 's'],
      truthTable: [
        [false, false, false, false],
        [false, false, true, true],
        [false, true, false, false],
        [false, true, true, true],
        [true, false, false, false],
        [true, false, true, true],
        [true, true, false, true],
        [true, true, true, true]
      ]
    },
    {
      expression: 'p -> q', 
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, true],
        [false, true, true],
        [true, false, false],
        [true, true, true]
      ]
    },
    {
      expression: 'if p then q', 
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, true],
        [false, true, true],
        [true, false, false],
        [true, true, true]
      ]
    },
    {
      expression: 'p and q -> s',
      variableNames: ['p', 'q', 's'],
      truthTable: [
        [false, false, false, true],
        [false, false, true, true],
        [false, true, false, true],
        [false, true, true, true],
        [true, false, false, true],
        [true, false, true, true],
        [true, true, false, false],
        [true, true, true, true]
      ]
    },
    {
      expression: 'p -> q and s',
      variableNames: ['p', 'q', 's'],
      truthTable: [
        [false, false, false, true],
        [false, false, true, true],
        [false, true, false, true],
        [false, true, true, true],
        [true, false, false, false],
        [true, false, true, false],
        [true, true, false, false],
        [true, true, true, true]
      ]
    },
    {
      expression: 'p <-> q', 
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, true],
        [false, true, false],
        [true, false, false],
        [true, true, true]
      ]
    },
    {
      expression: 'p = q', 
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, true],
        [false, true, false],
        [true, false, false],
        [true, true, true]
      ]
    },
    {
      expression: 'p == q', 
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, true],
        [false, true, false],
        [true, false, false],
        [true, true, true]
      ]
    },
    {
      expression: 'p iff q', 
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, true],
        [false, true, false],
        [true, false, false],
        [true, true, true]
      ]
    },
    {
      expression: 'p if and only if q', 
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, true],
        [false, true, false],
        [true, false, false],
        [true, true, true]
      ]
    },
    {
      expression: 'p <- q', 
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, true],
        [false, true, false],
        [true, false, true],
        [true, true, true]
      ]
    },
    {
      expression: 'p and q and true', 
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, false],
        [false, true, false],
        [true, false, false],
        [true, true, true]
      ]
    },
    {
      expression: 'p and false and q', 
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, false],
        [false, true, false],
        [true, false, false],
        [true, true, false]
      ]
    },
    {
      expression: 'true or p and q', 
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, true],
        [false, true, true],
        [true, false, true],
        [true, true, true]
      ]
    },
    {
      expression: 'p /\\ q', 
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, false],
        [false, true, false],
        [true, false, false],
        [true, true, true]
      ]
    },
    {
      expression: 'p \\/ q', 
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, false],
        [false, true, true],
        [true, false, true],
        [true, true, true]
      ]
    },
    {
      expression: 'p <--> q', 
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, true],
        [false, true, false],
        [true, false, false],
        [true, true, true]
      ]
    },
    {
      expression: 'p <==> q', 
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, true],
        [false, true, false],
        [true, false, false],
        [true, true, true]
      ]
    },
    {
      expression: 'p <=> q', 
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, true],
        [false, true, false],
        [true, false, false],
        [true, true, true]
      ]
    },
    {
      expression: 'p --> q', 
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, true],
        [false, true, true],
        [true, false, false],
        [true, true, true]
      ]
    },
    {
      expression: 'p => q', 
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, true],
        [false, true, true],
        [true, false, false],
        [true, true, true]
      ]
    },
    {
      expression: 'p ==> q', 
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, true],
        [false, true, true],
        [true, false, false],
        [true, true, true]
      ]
    },
    {
      expression: 'p <- q', 
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, true],
        [false, true, false],
        [true, false, true],
        [true, true, true]
      ]
    },
    {
      expression: 'p <= q', 
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, true],
        [false, true, false],
        [true, false, true],
        [true, true, true]
      ]
    },
    {
      expression: 'p <-- q', 
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, true],
        [false, true, false],
        [true, false, true],
        [true, true, true]
      ]
    },
    {
      expression: 'p <== q', 
      variableNames: ['p', 'q'],
      truthTable: [
        [false, false, true],
        [false, true, false],
        [true, false, true],
        [true, true, true]
      ]
    },
  ]
  testCases.forEach((testCase) => {
    it('generates correct query permutations for ' + testCase.expression, () => {
      const expectedResult = buildExpectedResultFromTable(testCase.variableNames, testCase.truthTable);
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
 * @param variableNames - a 1-dimensional array of length n - the variable names used in the expression.
 * @param table - A 2-dimensional array of 2^n rows - the expected boolean values of the truth table
 * @returns The expected return from the evaluate function
*/
function buildExpectedResultFromTable(variableNames: string[], table: boolean[][]): QueryPermutation[] {
  const result: QueryPermutation[] = [];
  assert(table.length === Math.pow(2, variableNames.length), 
    "Expected number of rows to equal 2 ^ the number of variables");
  for (let row of table) {
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