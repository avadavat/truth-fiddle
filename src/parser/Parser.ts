import { assertIsValidInput } from './ParserAssertions';

const reservedKeywords = new Set(['and', 'not', 'or']);

// Splits by parentheses and white space.
const splitRegex = new RegExp(/[ ()]+/g);

export function parse(expression: string): string[] {
  assertIsValidInput(expression);
  const words = expression.split(splitRegex);

  // Any word that isn't a reserved keyword is a variable.
  const variables = words.filter(
    word => !reservedKeywords.has(word.toLowerCase())
  );
  return variables;
}
