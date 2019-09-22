import React from 'react';
import { InputBox } from './InputBox';
import { SimpleTable } from './SimpleTable';
import { parse, extractVariables } from '../parser';
import { generateQueryPermutations } from '../evaluator';

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
    parseQuery();
  }, [query]);

  const parseQuery = () => {
    try {
      // Parse the query and extract its variables.
      parse(query);
      setMessage('');
      const queryPermutations = generateQueryPermutations(query);
      console.log(queryPermutations);
    } catch (e) {
      // TODO: Make error message more readable to the user.
      setMessage(e.message);
    }
  };

  return (
    <>
      <InputBox onQueryChange={onQueryChange} />
      <div>{message}</div>
      <SimpleTable />
    </>
  );
});
