import React from 'react';
import TableCell from '@material-ui/core/TableCell';

interface TruthTableCellProps {
  text: string;
}

export const TruthTableCell = React.memo(function TruthTableCell(
  props: TruthTableCellProps
) {
  return <TableCell>{props.text}</TableCell>;
});
