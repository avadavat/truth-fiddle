import { truthGrammar } from '../grammar';

export function parse(expression: string): void {
  const m = truthGrammar.match(expression);
  if (m.failed()) {
    throw new Error(`Parse failed ${m.shortMessage}`);
  }
}
