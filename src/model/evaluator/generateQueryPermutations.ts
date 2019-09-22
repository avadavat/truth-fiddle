import { QueryParameters, QueryPermutation } from './QueryPermutation';
import { ParseResult } from '../parser';
import { createSemantics } from './createSemantics';
import { MatchResult } from 'ohm-js';

/**
 * Generates all possible QueryPermutations given a query, that is, a list
 * of all possible states for each unique variable in the query and the value
 * from evaluating the given query with those states.
 * @param query
 */
export function generateQueryPermutations(
  parseResult: ParseResult
): QueryPermutation[] {
  // build semantics eval function

  // generate all possibilities
  let queryPermutations: QueryPermutation[] = [];
  let variableStates: boolean[] = [];
  generateQueryPermutationsHelper(
    parseResult.matchResult,
    queryPermutations,
    parseResult.variableNames,
    variableStates,
    /*variableIndex*/ 0
  );

  // return result objects
  return queryPermutations;
}

/**
 * Recursive function to generate all possible query parameters, that is,
 * a QueryParameter object for every unique set of boolean states for the
 * given variables list.
 *
 * Caution: This function runs exponentially relative to the number of variables.
 */
function generateQueryPermutationsHelper(
  matchResult: MatchResult,
  queryPermutations: QueryPermutation[],
  variableNames: string[],
  variableStates: boolean[],
  variableIndex: number
): void {
  if (variableIndex === variableNames.length) {
    // We have a value for every variable, add this
    // permutation to the list.
    queryPermutations.push(
      constructQueryPermutation(matchResult, variableNames, variableStates)
    );
    return;
  }

  // Recursively generate all query parameters for both states
  // of the variable at the current index.
  variableStates[variableIndex] = false;
  generateQueryPermutationsHelper(
    matchResult,
    queryPermutations,
    variableNames,
    variableStates,
    variableIndex + 1
  );
  variableStates[variableIndex] = true;
  generateQueryPermutationsHelper(
    matchResult,
    queryPermutations,
    variableNames,
    variableStates,
    variableIndex + 1
  );
}

/**
 * Builds a QueryPermutation object for the given query given a list of
 * the unique variable names in the query and their corresponding states.
 */
function constructQueryPermutation(
  matchResult: MatchResult,
  variableNames: string[],
  variableStates: boolean[]
): QueryPermutation {
  const queryParameters: QueryParameters = {};
  for (let i = 0; i < variableNames.length; i += 1) {
    queryParameters[variableNames[i]] = variableStates[i];
  }

  const queryPermutation: QueryPermutation = {
    queryParameters,
    value: evaluateQueryWithParameters(matchResult, queryParameters),
  };

  return queryPermutation;
}

/**
 * Evaluates the query with the given match result and parameters.
 */
function evaluateQueryWithParameters(
  matchResult: MatchResult,
  queryParameters: QueryParameters
) {
  const semantics = createSemantics(queryParameters);
  return semantics(matchResult).evaluate();
}
