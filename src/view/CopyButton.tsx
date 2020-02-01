import React from 'react';
import { IconButton } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';

const copyButtonStyle: React.CSSProperties = {
  color: 'white',
};

interface CopyButtonProps {
  query: string;
}

export const CopyButton = React.memo(function CopyButton(
  props: CopyButtonProps
) {
  const { query } = props;

  return (
    <IconButton aria-label="share" style={copyButtonStyle}>
      <ShareIcon color={'inherit'} />
    </IconButton>
  );
});
