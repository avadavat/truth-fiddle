import { QueryPermutation } from './QueryPermutation';
import { QueryParameters, constructQueryParameters } from './QueryParameters';
import { ParseResult } from '../parser';
import { createSemantics } from './createSemantics';
import { MatchResult } from 'ohm-js';

/**
 * Generates all possible QueryPermutations given a query, that is, a list
 * of all possible states for each unique variable in the query and the value
 * from evaluating the given query with those states.
 */
export function evaluate(parseResult: ParseResult): QueryPermutation[] {
  // Generate all query parameters permutations.
  const allQueryParameters: QueryParameters[] = [];
  generateQueryParametersPermutations(
    allQueryParameters,
    parseResult.variableNames
  );

  // Evaluate the result for all parameter permutations.
  const queryPermutations: QueryPermutation[] = evaluateQueryParameters(
    parseResult.matchResult,
    allQueryParameters
  );

  return queryPermutations;
}

/**
 * Evaluates the result and creates a QueryPermutation object for each QueryParameters object
 * given.
 * @param matchResult - The parsed match result, i.e. the function in which to plug in the query parameters.
 * @param allQueryParameters - The list of QueryParameters with which to evaluate the expression.
 */
function evaluateQueryParameters(
  matchResult: MatchResult,
  allQueryParameters: QueryParameters[]
): QueryPermutation[] {
  const queryPermutations: QueryPermutation[] = [];

  // Generates a function to evaluate the i-th query parameter
  const evaluateSemantics: (index: number) => boolean = createSemantics(
    matchResult,
    allQueryParameters
  );

  for (let i = 0; i < allQueryParameters.length; i += 1) {
    const queryParameters = allQueryParameters[i];
    queryPermutations.push({
      queryParameters,
      value: evaluateSemantics(i),
    });
  }

  return queryPermutations;
}

/**
 * Recursive function to generate all permutations of states for the parameters
 * in this query, that is, a QueryParameters object for every unique set of boolean
 * states for the given variables list.
 *
 * Caution: This function runs exponentially relative to the number of variables.
 */
function generateQueryParametersPermutations(
  queryParameters: QueryParameters[],
  variableNames: string[],
  variableStates: boolean[] = [],
  variableIndex: number = 0
): void {
  if (variableIndex === variableNames.length) {
    // We have a value for every variable, add this
    // permutation to the list.
    queryParameters.push(
      constructQueryParameters(variableNames, variableStates)
    );
    return;
  }

  // Recursively generate all query parameters for both states
  // of the variable at the current index.
  variableStates[variableIndex] = false;
  generateQueryParametersPermutations(
    queryParameters,
    variableNames,
    variableStates,
    variableIndex + 1
  );
  variableStates[variableIndex] = true;
  generateQueryParametersPermutations(
    queryParameters,
    variableNames,
    variableStates,
    variableIndex + 1
  );
}
