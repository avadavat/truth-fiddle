// TODO: Fully populate this list.
const invalidTokens = new Set(['+', '{', '}', '[', ']']);

/**
 * Initial pass through an expression to determine if it is valid.
 * Ensures there are no invalid tokens, all parenthesis are closed,
 * no consecutive special keywords and no consecutive variables.
 * TODO: Error messages for the user.
 * @param expression
 */
export function isValid(expression: string): boolean {
  if (containsInvalidTokens(expression)) {
    return false;
  }

  if (!matchesParenthesis(expression)) {
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

/**
 * Returns true if parenthesis are evenly matched in the given expression.
 * @param expression
 */
function matchesParenthesis(expression: string): boolean {
  let parenCount = 0;

  for (const character of expression) {
    if (character === '(') {
      parenCount += 1;
    } else if (character === ')') {
      parenCount -= 1;
    }

    if (parenCount < 0) {
      return false;
    }
  }

  return parenCount === 0;
}
