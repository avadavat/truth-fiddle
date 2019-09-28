import React from 'react';
import TableCell from '@material-ui/core/TableCell';

interface TruthTableCellProps {
  text: string;
}

export const TruthTableHeaderCell = React.memo(function TruthTableHeaderCell(
  props: TruthTableCellProps
) {
  return <TableCell align='center'>{props.text}</TableCell>;
});
