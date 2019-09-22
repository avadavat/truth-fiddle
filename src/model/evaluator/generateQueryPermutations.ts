import { QueryParameters, QueryPermutation } from './QueryPermutation';
import { ParseResult } from '../parser';

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
  queryPermutations: QueryPermutation[],
  variableNames: string[],
  variableStates: boolean[],
  variableIndex: number
): void {
  if (variableIndex === variableNames.length) {
    // We have a value for every variable, add this
    // permutation to the list.
    queryPermutations.push(
      constructQueryPermutation(variableNames, variableStates)
    );
    return;
  }

  // Recursively generate all query parameters for both states
  // of the variable at the current index.
  variableStates[variableIndex] = false;
  generateQueryPermutationsHelper(
    queryPermutations,
    variableNames,
    variableStates,
    variableIndex + 1
  );
  variableStates[variableIndex] = true;
  generateQueryPermutationsHelper(
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
  variableNames: string[],
  variableStates: boolean[]
): QueryPermutation {
  const queryParameters: QueryParameters = {};
  for (let i = 0; i < variableNames.length; i += 1) {
    queryParameters[variableNames[i]] = variableStates[i];
  }

  const queryPermutation: QueryPermutation = {
    queryParameters,
    value: evaluateQueryWithParameters(queryParameters),
  };

  return queryPermutation;
}

/**
 * Evaluates the given query with the given parameters.
 *
 * TODO: Create the Semantics object for TruthGrammar with the given parameters
 * and evaluate.
 * @param _query
 * @param _parameters
 */
function evaluateQueryWithParameters(_parameters: QueryParameters) {
  // TODO: Evaluate the parameters.
  return false;
}
