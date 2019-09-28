import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import { QueryPermutation } from '../../model';
import { TruthTableHeaderCell } from './TruthTableHeaderCell';
import uuid from 'uuid';

const resultString = 'Result';

interface TruthTableRowProps {
  row: QueryPermutation;
}

export const TruthTableHeaderRow = React.memo(function TruthTableHeaderRow(
  props: TruthTableRowProps
) {
  const { row } = props;
  const cells: JSX.Element[] = [];
  row.queryParameters.forEach((value: boolean, variableName: string) => {
    cells.push(
      <TruthTableHeaderCell
        key={variableName}
        text={variableName}
      />
    );
  });

  // Add column that holds the result.
  cells.push(
    <TruthTableHeaderCell
      key={uuid()}
      text={resultString}
    />
  );

  return <TableRow>{cells}</TableRow>;
});
