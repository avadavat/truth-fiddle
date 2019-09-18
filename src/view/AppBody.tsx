import React from 'react';
import { InputBox } from './InputBox';
import { SimpleTable } from './SimpleTable';

/**
 * AppBody contains everything in the application, just used
 * as a layer of abstraction from App.
 */
export const AppBody = React.memo(function AppBody() {
  const [query, setQuery] = React.useState<string>('');

  const onQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  React.useEffect(() => {
    // TODO: Check if it's a valid query
    // TODO: Extract variables from expression
    // TODO: Provide a callback to evaluate the expression
    // TODO: Populate the table
    console.log(query);
  }, [query]);

  return (
    <>
      <InputBox onQueryChange={onQueryChange} />
      <SimpleTable />
    </>
  );
});
