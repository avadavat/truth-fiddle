/**
 * A map of the variable names in a query to their values
 */
export type QueryParameters = Map<string, boolean>;

/**
 * Builds a QueryParameters object for the given query given a list of
 * the unique variable names in the query and their corresponding states.
 */
export function constructQueryParameters(
  variableNames: string[],
  variableStates: boolean[]
): QueryParameters {
  const queryParameters: QueryParameters = new Map<string, boolean>();
  for (let i = 0; i < variableNames.length; i += 1) {
    queryParameters.set(variableNames[i], variableStates[i]);
  }
  return queryParameters;
}
