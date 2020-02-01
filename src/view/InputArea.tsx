import React from 'react';
import { InputBox } from './InputBox';
import { CopyButton } from './CopyButton';

interface InputAreaProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export const InputArea = React.memo(function InputArea(props: InputAreaProps) {
  const { query, onQueryChange } = props;

  return (
    <div className="rowC">
      <InputBox query={query} onQueryChange={onQueryChange} />
      <CopyButton query={query} />
    </div>
  );
});
