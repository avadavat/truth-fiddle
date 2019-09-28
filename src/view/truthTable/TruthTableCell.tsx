import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import './truthTable.css';

interface TruthTableCellProps {
  value: boolean;
}

export const TruthTableCell = React.memo(function TruthTableCell(
  props: TruthTableCellProps
) {
  return <TableCell className={props.value ? "True-cell" : "False-cell"} align='center'>{props.value ? 'T' : 'F'}</TableCell>;
});
