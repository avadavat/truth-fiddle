import React from 'react';
import QueryString from 'query-string';
import { InputBox } from './InputBox';
import { TruthTable } from './truthTable';
import { evaluate, parse, ParseResult, QueryPermutation } from '../model';

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

      // Parse the query and extract its variables.
      const parseResult: ParseResult = parse(query);
      const evaluateResult: QueryPermutation[] = evaluate(parseResult);
      setResult(evaluateResult);
    } catch (e) {
      // TODO: Make error message more readable to the user.
      setMessage(e.message);
    }
  }, [query]);

  return (
    <>
      <InputBox onQueryChange={onQueryChange} query={query} />
      <div>{message}</div>
      <TruthTable rows={result} />
    </>
  );
});
