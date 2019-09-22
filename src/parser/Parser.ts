// import { assertIsValidInput } from './ParserAssertions';
import { truthGrammar } from './TruthGrammar';
import { grammar } from 'ohm-js';

const reservedKeywords = new Set(['and', 'not', 'or', 'xor']);

// Splits by parentheses and white space.
const splitRegex = new RegExp(/[ ()]+/g);

// Grammar object that defines the rules for the language.
const myGrammar = grammar(truthGrammar);

export function parse(expression: string): void {
  const m = myGrammar.match(expression);
  if (m.failed()) {
    throw new Error(`Parse failed ${m.shortMessage}`);
  }
}

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
