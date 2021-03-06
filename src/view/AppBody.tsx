import React from 'react';
import QueryString from 'query-string';
import { Title } from './Title';
import { InputArea } from './InputArea';
import { TruthTable } from './truthTable';
import computeTruthTable from '../util/computeTruthTable';
import { QueryPermutation } from '../model';
import BooleanExpressions from 'boolean-expressions';

// Expression the user sees when initially loading the application.
const defaultExpression = 'p and q';

const getInitialQuery = (): string => {
  // Set the query to the query specified by the url or the default.
  const params = QueryString.parseUrl(window.location.search);
  const initialQuery: string = params.query.q
    ? params.query.q.toString()
    : defaultExpression;
  return initialQuery;
};

/**
 * AppBody contains everything in the application, just used
 * as a layer of abstraction from App.
 */
export const AppBody = React.memo(function AppBody() {
  const [query, setQuery] = React.useState<string>('');
  const [result, setResult] = React.useState<QueryPermutation[]>([]);
  const [message, setMessage] = React.useState<string>('');

  const onQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  React.useEffect(() => {
    setQuery(getInitialQuery());
  }, []);

  React.useEffect(() => {
    try {
      setMessage('');

      const b = new BooleanExpressions(query);
      const truthTable = computeTruthTable(b);
      setResult(truthTable);
    } catch (e) {
      // TODO: Make error message more readable to the user.
      setMessage('Invalid Query');
      setResult([]);
    }
  }, [query]);

  return (
    <>
      <Title />
      <InputArea onQueryChange={onQueryChange} query={query} />
      <div>{message}</div>
      <TruthTable rows={result} />
    </>
  );
});
