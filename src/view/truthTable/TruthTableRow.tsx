import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import { QueryPermutation } from '../../model';
import { TruthTableCell } from './TruthTableCell';
import uuid from 'uuid';

interface TruthTableRowProps {
  row: QueryPermutation;
}

export const TruthTableRow = React.memo(function TruthTableRow(
  props: TruthTableRowProps
) {
  const { row } = props;
  const cells: JSX.Element[] = [];
  row.queryParameters.forEach((value: boolean, variableName: string) => {
    cells.push(<TruthTableCell key={variableName} value={value} />);
  });

  // Add column that holds the result.
  cells.push(<TruthTableCell key={uuid()} value={row.value} />);

  return <TableRow>{cells}</TableRow>;
});
