import { extractVariables } from '../parser';

/**
 * Given an expression, evaluates the result of the expression.
 * @param expression
 */
export function evaluate(expression: string): boolean {
  return false;
}

/**
 * Recursive function to generate all possible query parameters, that is,
 * a QueryParameter object for every unique set of boolean states for the
 * given variables list.
 *
 * Caution: This function runs exponentially relative to the number of variables.
 */
function generateAllQueryParameters(
  allQueryParameters: QueryParameters[],
  variableNames: string[],
  variableStates: boolean[],
  variableIndex: number
): void {
  if (variableIndex === variableNames.length) {
    // We have a value for every variable, add this
    // parameter permutation to the list.
    const queryParameters: QueryParameters = {};
    for (let i = 0; i < variableNames.length; i += 1) {
      queryParameters[variableNames[i]] = variableStates[i];
    }
    allQueryParameters.push(queryParameters);
    return;
  }

  // Recursively generate all query parameters for both states
  // of the variable at the current index.
  variableStates[variableIndex] = false;
  generateAllQueryParameters(
    allQueryParameters,
    variableNames,
    variableStates,
    variableIndex + 1
  );
  variableStates[variableIndex] = true;
  generateAllQueryParameters(
    allQueryParameters,
    variableNames,
    variableStates,
    variableIndex + 1
  );
}

function evaluateQueryWithParameters(
  _query: string,
  _parameters: QueryParameters
) {
  // TODO: Evaluate the parameters.
  return false;
}

/**
 * Generates all possible QueryPermutations given a query and the unique
 * variables names in it, that is, a list of all possible states for each
 * variable and the value from evaluating the given query with those states.
 * @param query
 * @param variableNames
 */
export function generateQueryPermutations(query: string): QueryPermutation[] {
  // build semantics eval function

  // generate all possibilities
  let queryParameters: QueryParameters[] = [];
  const variableNames = extractVariables(query);
  let variableStates: boolean[] = [];
  generateAllQueryParameters(
    queryParameters,
    variableNames,
    variableStates,
    /*variableIndex*/ 0
  );

  // evaluate each one
  const queryPermutations: QueryPermutation[] = queryParameters.map(
    parameters => {
      return {
        parameters,
        value: evaluateQueryWithParameters(query, parameters),
      };
    }
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
  parameters: QueryParameters;
  value: boolean;
}

/**
 * A map of the variable names in a query to their values
 */
export type QueryParameters = { [variableName: string]: boolean };
