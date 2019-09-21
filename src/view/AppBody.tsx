import React from 'react';
import { InputBox } from './InputBox';
import { SimpleTable } from './SimpleTable';
import { parse } from '../parser';

/**
 * AppBody contains everything in the application, just used
 * as a layer of abstraction from App.
 */
export const AppBody = React.memo(function AppBody() {
  const [query, setQuery] = React.useState<string>('');
  const [variables, setVariables] = React.useState<string[]>([]);

  const onQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  React.useEffect(() => {
    try {
      setVariables(parse(query));
    } catch (e) {
      // TODO: Display error message to the user.
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
