import React from 'react';

const inputBoxStyle: React.CSSProperties = {
  borderRadius: 24,
  paddingLeft: 8,
  paddingRight: 8,
  fontSize: 24,
};

interface InputBoxProps {
  onQueryChange: (query: string) => void;
}

/**
 * InputBox is where the user can enter their boolean expression.
 */
export const InputBox = React.memo(function InputBox(props: InputBoxProps) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    props.onQueryChange(query);
  };

  return <input style={inputBoxStyle} onChange={onChange} />;
});
