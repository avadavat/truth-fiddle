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

  const onQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  React.useEffect(() => {
    try {
      setVariables(parse(query));
    } catch (e) {
      // TODO: Display readable error message to the user.
      console.log(e.message);
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
      <SimpleTable />
    </>
  );
});
