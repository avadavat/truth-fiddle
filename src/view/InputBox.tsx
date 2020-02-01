import React from 'react';

const inputBoxStyle: React.CSSProperties = {
  borderRadius: 24,
  paddingLeft: 8,
  paddingRight: 8,
  fontSize: 24,
  textAlign: 'center',
  verticalAlign: 'middle',
};

interface InputBoxProps {
  query: string;
  onQueryChange: (query: string) => void;
}

/**
 * InputBox is where the user can enter their boolean expression.
 */
export const InputBox = React.memo(function InputBox(props: InputBoxProps) {
  const { query } = props;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onQueryChange(event.target.value);
  };

  return <input style={inputBoxStyle} onChange={onChange} value={query} />;
});
