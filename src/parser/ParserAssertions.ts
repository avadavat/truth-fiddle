const validTokens = new Set(
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ() '.split('')
);

/**
 * Initial pass through an input to determine if it is valid.
 * Ensures there are no invalid tokens, all parenthesis are closed,
 * no consecutive special keywords and no consecutive variables.
 * @param input
 */
export function assertIsValidInput(input: string): void {
  assertNoInvalidTokens(input);
  assertMatchesParenthesis(input);
}

/**
 * Ensures there are no invalid tokens in the given input.
 * @param input
 */
function assertNoInvalidTokens(input: string): void {
  for (const token of input) {
    if (!validTokens.has(token)) {
      throw new Error(`Invalid token ${token}!`);
    }
  }
}

/**
 * Ensures parenthesis in the given input are evenly matched.
 * @param input
 */
function assertMatchesParenthesis(input: string): void {
  let parenCount = 0;

  for (let i = 0; i < input.length; i += 1) {
    const character = input.charAt(i);
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
