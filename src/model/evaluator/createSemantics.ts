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
    OrExp_or: function(left: any, _op: any, right: any): boolean {
      return left.evaluate() || right.evaluate();
    },
    AndExp_and: function(left: any, _op: any, right: any): boolean {
      return left.evaluate() && right.evaluate();
    },
    XorExp_xor: function(left: any, _op: any, right: any): boolean {
      return left.evaluate() !== right.evaluate();
    },
    IfExp_arrow: function(left, _op, right) {
      return !left.evaluate() || right.evaluate();
    },
    IfExp_ifThen: function(_if, left, _then, right) {
      return !left.evaluate() || right.evaluate();
    },
    ConverseExp_arrow: function(left, _op, right) {
      return left.evaluate() || !right.evaluate();
    },
    BiconditionalExp_biconditional: function(
      left: any,
      _op: any,
      right: any
    ): boolean {
      return left.evaluate() === right.evaluate();
    },
    ParenExp: function(_open, exp, _close) {
      return exp.evaluate();
    },
    ident: function(first, remaining) {
      const variableName = first.sourceString + remaining.sourceString;
      return queryParameters[index].get(variableName);
    },
    True: function(_) {
      return true;
    },
    False: function(_) {
      return false;
    },
  })(matchResult);

  function evaluateWithI(i: number): boolean {
    index = i;
    return semantics.evaluate();
  }

  return evaluateWithI;
}
