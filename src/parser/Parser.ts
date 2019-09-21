import { assertIsValidInput } from './ParserAssertions';

const reservedKeywords = new Set(['and', 'not', 'or']);

// Splits by parentheses and white space.
const splitRegex = new RegExp(/[ ()]+/g);

export function parse(expression: string): string[] {
  assertIsValidInput(expression);
  return extractVariables(expression);
}

function extractVariables(expression: string): string[] {
  const words: string[] = expression.split(splitRegex);

  // Any word that isn't a reserved keyword is a variable.
  const variables: string[] = words.filter(
    word => word.length > 0 && !reservedKeywords.has(word.toLowerCase())
  );

  // Only count each variable once.
  const uniqueVariables: string[] = variables.filter(
    (variable, i) => variables.indexOf(variable) === i
  );

  return uniqueVariables;
}
