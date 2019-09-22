import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import { QueryPermutation } from '../../model';
import { TruthTableCell } from './TruthTableCell';

interface TruthTableHeaderProps {
  row: QueryPermutation;
}

export const TruthTableHeader = React.memo(function TruthTableHeader(
  props: TruthTableHeaderProps
) {
  const { row } = props;
  const cells: JSX.Element[] = [];
  row.queryParameters.forEach((_value: boolean, variableName: string) => {
    cells.push(<TruthTableCell text={variableName} />);
  });

  cells.push(<TruthTableCell text={'Result'} />);

  return <TableRow>{cells}</TableRow>;
});
