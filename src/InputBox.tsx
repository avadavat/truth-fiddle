import React from 'react';

const inputBoxStyle: React.CSSProperties = {
  borderRadius: 24,
  paddingLeft: 8,
  paddingRight: 8,
  fontSize: 24,
};

export const InputBox = React.memo(function InputBox() {
  return <input style={inputBoxStyle} />;
});
