# truth-fiddle

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

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
