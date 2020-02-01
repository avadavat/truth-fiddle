# truth-fiddle

[![Codeship Status for avadavat/truth-fiddle](https://app.codeship.com/projects/256103c0-c0a3-0137-a7a3-022fcc454e27/status?branch=master)](https://app.codeship.com/projects/365921)

`truth-fiddle` is a truth table generator. Enter any boolean expression and the application will show all permutations of the possible input values for each variable and the result for each of those possibilities.

The parser for `truth-fiddle` makes use of the [Ohm package](https://github.com/harc/ohm) with grammar rules found [here](https://github.com/avadavat/truth-fiddle/blob/master/src/model/grammar/grammarRules.ts).

# Installation

```
git clone https://github.com/avadavat/truth-fiddle
cd truth-fiddle
npm install
npm run dev
```
