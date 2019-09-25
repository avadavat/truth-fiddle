import { truthGrammar } from '../grammar';
import { QueryParameters } from './QueryParameters';
import { MatchResult } from 'ohm-js';

/**
 * Creates a semantics object with our truth grammar for the given query
 * parameters.
 *
 * TODO: Is there a way we can create one semantics object, and use that same
 * object for evaluating all different query parameters permutations? It feels
 * wasteful to create a semantics object for each permutation but I don't know
 * how else to link the ident function to the value for each variable.
 */
export function createSemantics(queryParameters: QueryParameters) {
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
      return queryParameters.get(variableName);
    },
  });

  return semantics;
}

export function createSemantics2(
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
