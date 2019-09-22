import React from 'react';
import { InputBox } from './InputBox';
import { SimpleTable } from './SimpleTable';
import { parse } from '../parser';

// Expression the user sees when initially loading the application.
const initialExpression = 'p and q';

/**
 * AppBody contains everything in the application, just used
 * as a layer of abstraction from App.
 */
export const AppBody = React.memo(function AppBody() {
  const [query, setQuery] = React.useState<string>(initialExpression);
  const [variables, setVariables] = React.useState<string[]>(
    parse(initialExpression)
  );
  const [message, setMessage] = React.useState<string>('');

  const onQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  React.useEffect(() => {
    try {
      setVariables(parse(query));
      setMessage('');
    } catch (e) {
      // TODO: Make error message more readable to the user.
      setMessage(e.message);
    }
  }, [query]);

  React.useEffect(() => {
    // TODO: Provide a callback to evaluate the expression
    // TODO: Populate the table
    console.log('variables:', variables);
  }, [variables]);

  return (
    <>
      <InputBox onQueryChange={onQueryChange} />
      <div>{message}</div>
      <SimpleTable />
    </>
  );
});
