import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import { QueryPermutation } from '../../model';
import { TruthTableCell } from './TruthTableCell';

interface TruthTableRowProps {
  row: QueryPermutation;
}

export const TruthTableRow = React.memo(function TruthTableRow(
  props: TruthTableRowProps
) {
  const { row } = props;
  const cells: JSX.Element[] = [];
  row.queryParameters.forEach((value: boolean, variableName: string) => {
    cells.push(<TruthTableCell id={variableName} text={String(value)} />);
  });

  cells.push(<TruthTableCell id={'result'} text={String(row.value)} />);

  return <TableRow>{cells}</TableRow>;
});
