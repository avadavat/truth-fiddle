import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { QueryPermutation } from '../model/evaluator/QueryPermutation';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
  })
);

interface TruthTableProps {
  rows: QueryPermutation[];
}

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

export const TruthTable = React.memo(function TruthTable(
  props: TruthTableProps
) {
  const classes = useStyles();
  const { rows: result } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          {result.length > 0 && <TruthTableHeader row={result[0]} />}
        </TableHead>
        <TableBody>
          {result.map((queryPermutation, index) => (
            <TruthTableRow row={queryPermutation} key={index} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
});
