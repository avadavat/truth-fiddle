/**
 * A map of the variable names in a query to their values
 */
export type QueryParameters = { [variableName: string]: boolean };

/**
 * Builds a QueryParameters object for the given query given a list of
 * the unique variable names in the query and their corresponding states.
 */
export function constructQueryParameters(
  variableNames: string[],
  variableStates: boolean[]
): QueryParameters {
  const queryParameters: QueryParameters = {};
  for (let i = 0; i < variableNames.length; i += 1) {
    queryParameters[variableNames[i]] = variableStates[i];
  }
  return queryParameters;
}
