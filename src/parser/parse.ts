// import { assertIsValidInput } from './ParserAssertions';
import { truthGrammar } from './truthGrammar';
import { grammar } from 'ohm-js';

// Grammar object that defines the rules for the language.
const myGrammar = grammar(truthGrammar);

export function parse(expression: string): void {
  const m = myGrammar.match(expression);
  if (m.failed()) {
    throw new Error(`Parse failed ${m.shortMessage}`);
  }
}
