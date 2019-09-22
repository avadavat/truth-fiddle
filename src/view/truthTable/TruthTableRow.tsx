import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import { QueryPermutation } from '../../model';
import { TruthTableCell } from './TruthTableCell';
import uuid from 'uuid';

const resultString = 'Result';

interface TruthTableRowProps {
  isHeader: boolean;
  row: QueryPermutation;
}

export const TruthTableRow = React.memo(function TruthTableRow(
  props: TruthTableRowProps
) {
  const { row, isHeader } = props;
  const cells: JSX.Element[] = [];
  row.queryParameters.forEach((value: boolean, variableName: string) => {
    cells.push(
      <TruthTableCell
        key={variableName}
        text={isHeader ? variableName : String(value)}
      />
    );
  });

  // Add column that holds the result.
  cells.push(
    <TruthTableCell
      key={uuid()}
      text={isHeader ? resultString : String(row.value)}
    />
  );

  return <TableRow>{cells}</TableRow>;
});
