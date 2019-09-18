// TODO: Fully populate this list.
const invalidTokens = new Set(['+', '{', '}', '[', ']']);

/**
 * Initial pass through an expression to determine if it is valid.
 * Ensures there are no invalid tokens, all parenthesis are closed,
 * no consecutive special keywords and no consecutive variables.
 * @param expression
 */
export function isValid(expression: string): boolean {
  if (containsInvalidTokens(expression)) {
    return false;
  }

  return true;
}

/**
 * Returns true if there are no invalid tokens in the expression.
 * @param expression
 */
function containsInvalidTokens(expression: string): boolean {
  for (const character of expression) {
    if (invalidTokens.has(character)) {
      return true;
    }
  }

  return false;
}
