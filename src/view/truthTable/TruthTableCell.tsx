import React from 'react';
import TableCell from '@material-ui/core/TableCell';

interface TruthTableCellProps {
  id?: string;
  text: string;
}

export const TruthTableCell = React.memo(function TruthTableCell(
  props: TruthTableCellProps
) {
  const { text } = props;
  const key = props.id || text;

  return <TableCell key={key}>{text}</TableCell>;
});
