import { QueryParameters } from './QueryParameters';

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
