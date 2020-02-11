import React from 'react';
import { InfoTooltip } from './InfoTooltip';

const titleStyle: React.CSSProperties = {
  marginBottom: 0,
};

const descriptionStyle: React.CSSProperties = {
  display: 'inline-block',
  verticalAlign: 'middle',
};

export const Title = React.memo(function Title() {
  return (
    <>
      <h1 style={titleStyle}>Truth Fiddle</h1>
      <div className="rowC">
        <h4 style={descriptionStyle}>A truth table generator.</h4>
        <InfoTooltip />
      </div>
    </>
  );
});
