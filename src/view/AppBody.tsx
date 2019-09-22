import React from 'react';
import { InputBox } from './InputBox';
import { TruthTable } from './truthTable';
import { evaluate, parse, ParseResult, QueryPermutation } from '../model';

// Expression the user sees when initially loading the application.
const initialExpression = 'p and q';

/**
 * AppBody contains everything in the application, just used
 * as a layer of abstraction from App.
 */
export const AppBody = React.memo(function AppBody() {
  const [query, setQuery] = React.useState<string>(initialExpression);
  const [result, setResult] = React.useState<QueryPermutation[]>([]);
  const [message, setMessage] = React.useState<string>('');

  const onQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

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
      <InputBox onQueryChange={onQueryChange} />
      <div>{message}</div>
      <TruthTable rows={result} />
    </>
  );
});
