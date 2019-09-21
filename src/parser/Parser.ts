import { assertIsValidInput } from './ParserAssertions';

export function parse(input: string): void {
  assertIsValidInput(input);
  return extractVariables(input);
}

function extractVariables(expression: string) {}
