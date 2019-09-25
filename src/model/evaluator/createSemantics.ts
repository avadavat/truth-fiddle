import { truthGrammar } from '../grammar';
import { QueryParameters } from './QueryParameters';
import { MatchResult } from 'ohm-js';

/**
 * Creates a semantics object with our truth grammar for the given query
 * parameters.
 *
 * Returns a function to evaluate the semantics for the given match result
 * for the i-th QueryParameters object. This takes advantage of closures to
 * allow us to re-use the same semantics object.
 *
 * The semantics API doesn't allow us to accept parameters to the evaluate
 * function so this is how we get around it.
 */
export function createSemantics(
  matchResult: MatchResult,
  queryParameters: QueryParameters[]
): (i: number) => boolean {
  let index = 0;
  const semantics = truthGrammar.createSemantics().addOperation('evaluate', {
    Exp: function(e) {
      return e.evaluate();
    },
    NotExp: function(_op, exp) {
      return !exp.evaluate();
    },
    OrExp: function(left, _op, right) {
      return left.evaluate() || right.evaluate();
    },
    AndExp: function(left, _op, right) {
      return left.evaluate() && right.evaluate();
    },
    XorExp: function(left, _op, right) {
      return left.evaluate() ^ right.evaluate();
    },
    ParenExp: function(_open, exp, _close) {
      return exp.evaluate();
    },
    ident: function(first, remaining) {
      const variableName = first.sourceString + remaining.sourceString;
      return queryParameters[index].get(variableName);
    },
  })(matchResult);

  function evaluateWithI(i: number): boolean {
    index = i;
    return semantics.evaluate();
  }

  return evaluateWithI;
}
