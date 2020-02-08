// Splits by parentheses, white space, and special characters.
const splitRegex = new RegExp(/[ ()|&~!^]+/g);
const reservedKeywords = new Set(['and', 'not', 'or', 'xor', '&&', '&', '||',
 '|', '~', '!', '^', '->', 'if', 'then', '<->', '=', '==', 'iff', 'only', '<-', 'true', 'false']);

/**
 * Returns a list of all the unique variable names in the given expression.
 */
export function extractVariables(expression: string): string[] {
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
