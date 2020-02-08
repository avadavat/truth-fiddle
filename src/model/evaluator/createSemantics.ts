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
    PriExp: function(e) {
      return e.evaluate();
    },
    NotExp: function(_op, exp) {
      return !exp.evaluate();
    },
    OrExp_or: or,
    OrExp_doublePipe: or,
    OrExp_singlePipe: or,
    AndExp_and: and,
    AndExp_doubleAmpersand: and,
    AndExp_singleAmpersand: and,
    XorExp_xor: xor,
    XorExp_caret: xor,
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

function and(left, _op, right): boolean {
  return left.evaluate() && right.evaluate();
}

function or(left, _op, right): boolean {
  return left.evaluate() || right.evaluate();
}

function xor(left, _op, right): boolean {
  return left.evaluate() !== right.evaluate();
}