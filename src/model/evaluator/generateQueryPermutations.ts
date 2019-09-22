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
export function generateQueryPermutations(
  parseResult: ParseResult
): QueryPermutation[] {
  // Generate all query parameters permutations.
  const allQueryParameters: QueryParameters[] = [];
  generateQueryParametersPermutations(
    allQueryParameters,
    parseResult.variableNames
  );

  // Evaluate the result for all parameter permutations.
  const matchResult = parseResult.matchResult;
  const queryPermutations: QueryPermutation[] = [];
  allQueryParameters.forEach(queryParameters => {
    queryPermutations.push({
      queryParameters,
      value: evaluateQueryWithParameters(matchResult, queryParameters),
    });
  });

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

/**
 * Evaluates the query with the given match result and parameters.
 */
function evaluateQueryWithParameters(
  matchResult: MatchResult,
  queryParameters: QueryParameters
): boolean {
  const semantics = createSemantics(queryParameters);
  return semantics(matchResult).evaluate();
}
