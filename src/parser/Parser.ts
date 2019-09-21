import { assertIsValidExpression } from './ParserAssertions';

/**
 * Initial pass through an expression to determine if it is valid.
 * Ensures there are no invalid tokens, all parenthesis are closed,
 * no consecutive special keywords and no consecutive variables.
 * @param expression
 */
export function parse(expression: string): void {
  assertIsValidExpression(expression);
}
