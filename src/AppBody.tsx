import React from 'react';
import { InputBox, SimpleTable } from '.';

/**
 * AppBody contains everything in the application, just used
 * as a layer of abstraction from App.
 */
export const AppBody = React.memo(function AppBody() {
  const onQueryChange = (query: string) => {
    console.log(query);
  };

  return (
    <>
      <InputBox onQueryChange={onQueryChange} />
      <SimpleTable />
    </>
  );
});
