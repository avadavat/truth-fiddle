# truth-fiddle

[![Codeship Status for avadavat/truth-fiddle](https://app.codeship.com/projects/256103c0-c0a3-0137-a7a3-022fcc454e27/status?branch=master)](https://app.codeship.com/projects/365921)

`truth-fiddle` is a truth table generator. Enter any boolean expression and the application will show all permutations of the possible input values for each variable and the result for each of those possibilities.

The parser for `truth-fiddle` makes use of the [Ohm package](https://github.com/harc/ohm) with the following grammar:
```
Exp ::= NotExp | AndExp | OrExp | XorExp | ParenExp | ident
NotExp ::= "not" Exp
OrExp ::= Exp "or" Exp
AndExp ::= Exp "and" Exp
XorExp ::= Exp "xor" Exp
ParenExp ::= "(" Exp ")"
ident ::= letter (letter | digit)*
```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

