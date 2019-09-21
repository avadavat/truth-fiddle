import { assertIsValidExpression } from './ParserAssertions';

export function parse(expression: string): void {
  assertIsValidExpression(expression);
}
