import React from 'react';
import { InputBox } from './InputBox';
import { SimpleTable } from './SimpleTable';
import { parse, ParseResult } from '../model/parser';
import { evaluate } from '../model/evaluator';

// Expression the user sees when initially loading the application.
const initialExpression = 'p and q';

/**
 * AppBody contains everything in the application, just used
 * as a layer of abstraction from App.
 */
export const AppBody = React.memo(function AppBody() {
  const [query, setQuery] = React.useState<string>(initialExpression);
  const [message, setMessage] = React.useState<string>('');

  const onQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  React.useEffect(() => {
    try {
      setMessage('');

      // Parse the query and extract its variables.
      const parseResult: ParseResult = parse(query);
      const queryPermutations = evaluate(parseResult);
      console.log(queryPermutations);
    } catch (e) {
      // TODO: Make error message more readable to the user.
      setMessage(e.message);
    }
  }, [query]);

  return (
    <>
      <InputBox onQueryChange={onQueryChange} />
      <div>{message}</div>
      <SimpleTable />
    </>
  );
});
