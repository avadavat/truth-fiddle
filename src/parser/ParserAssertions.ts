const validTokens = new Set(
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ() '.split('')
);

export function assertIsValidExpression(expression: string): void {
  assertNoInvalidTokens(expression);
  assertMatchesParenthesis(expression);
}

/**
 * Ensures there are no invalid tokens in the given expression.
 * @param expression
 */
function assertNoInvalidTokens(expression: string): void {
  for (const token of expression) {
    if (!validTokens.has(token)) {
      throw new Error(`Invalid token ${token}!`);
    }
  }
}

/**
 * Ensures parenthesis in the given expression are evenly matched.
 * @param expression
 */
function assertMatchesParenthesis(expression: string): void {
  let parenCount = 0;

  for (let i = 0; i < expression.length; i += 1) {
    const character = expression.charAt(i);
    if (character === '(') {
      parenCount += 1;
    } else if (character === ')') {
      parenCount -= 1;
    }

    if (parenCount < 0) {
      throw new Error(`Overmatched parenthesis at index ${i}!`);
    }
  }

  if (parenCount > 0) {
    throw new Error('Undermatched parenthesis!');
  }
}
