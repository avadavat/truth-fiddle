import { extractVariables } from '../parser';

function evaluateQueryWithParameters(
  _query: string,
  _parameters: QueryParameters
) {
  // TODO: Evaluate the parameters.
  return false;
}

/**
 * Builds a QueryPermutation object for the given query given a list of
 * the unique variable names in the query and their corresponding states.
 */
function constructQueryPermutation(
  query: string,
  variableNames: string[],
  variableStates: boolean[]
): QueryPermutation {
  const queryParameters: QueryParameters = {};
  for (let i = 0; i < variableNames.length; i += 1) {
    queryParameters[variableNames[i]] = variableStates[i];
  }

  const queryPermutation: QueryPermutation = {
    queryParameters,
    value: evaluateQueryWithParameters(query, queryParameters);
  }

  return queryPermutation;
}

/**
 * Recursive function to generate all possible query parameters, that is,
 * a QueryParameter object for every unique set of boolean states for the
 * given variables list.
 *
 * Caution: This function runs exponentially relative to the number of variables.
 */
function generateQueryPermutationsHelper(
  query: string,
  queryPermutations: QueryPermutation[],
  variableNames: string[],
  variableStates: boolean[],
  variableIndex: number
): void {
  if (variableIndex === variableNames.length) {
    // We have a value for every variable, add this
    // permutation to the list.
    queryPermutations.push(constructQueryPermutation(
      query,
      variableNames,
      variableStates
    ));
    return;
  }

  // Recursively generate all query parameters for both states
  // of the variable at the current index.
  variableStates[variableIndex] = false;
  generateQueryPermutationsHelper(
    query,
    queryPermutations,
    variableNames,
    variableStates,
    variableIndex + 1
  );
  variableStates[variableIndex] = true;
  generateQueryPermutationsHelper(
    query,
    queryPermutations,
    variableNames,
    variableStates,
    variableIndex + 1
  );
}

/**
 * Generates all possible QueryPermutations given a query, that is, a list
 * of all possible states for each unique variable in the query and the value
 * from evaluating the given query with those states.
 * @param query
 */
export function generateQueryPermutations(query: string): QueryPermutation[] {
  // build semantics eval function

  // generate all possibilities
  let queryPermutations: QueryPermutation[] = [];
  const variableNames = extractVariables(query);
  let variableStates: boolean[] = [];
  generateQueryPermutationsHelper(
    query,
    queryPermutations,
    variableNames,
    variableStates,
    /*variableIndex*/ 0
  );

  // return result objects
  return queryPermutations;
}

/**
 * QueryPermutation represents one permutation of the possible results
 * of the current query. For example, if the query is 'p and q', one
 * possible permutation is p=0 and q=1 with value 0.
 *
 * This contains a map of the variable names to their state in this
 * permutation, and the output of the query with those values.
 */
export interface QueryPermutation {
  queryParameters: QueryParameters;
  value: boolean;
}

/**
 * A map of the variable names in a query to their values
 */
export type QueryParameters = { [variableName: string]: boolean };
