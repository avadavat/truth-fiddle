import { truthGrammar } from '../grammar';
import { MatchResult } from 'ohm-js';
import { extractVariables } from './extractVariables';

export interface ParseResult {
  matchResult: MatchResult;
  variableNames: string[];
}

export function parse(query: string): ParseResult {
  const matchResult = truthGrammar.match(query);
  if (matchResult.failed()) {
    throw new Error(`Parse failed ${matchResult.shortMessage}`);
  }
  const variableNames = extractVariables(query);
  const parseResult: ParseResult = { matchResult, variableNames };
  return parseResult;
}
