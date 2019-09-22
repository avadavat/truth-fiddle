import { grammarRules } from './grammarRules';
import { grammar } from 'ohm-js';

// Grammar object that defines the rules for the language.
export const truthGrammar = grammar(grammarRules);
