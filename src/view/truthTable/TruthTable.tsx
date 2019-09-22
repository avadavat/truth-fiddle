import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import { QueryPermutation } from '../../model';
import { TruthTableRow } from './TruthTableRow';

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

export const TruthTable = React.memo(function TruthTable(
  props: TruthTableProps
) {
  const classes = useStyles();
  const { rows: result } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          {result.length > 0 && (
            <TruthTableRow row={result[0]} isHeader={true} />
          )}
        </TableHead>
        <TableBody>
          {result.map((queryPermutation, index) => (
            <TruthTableRow
              row={queryPermutation}
              isHeader={false}
              key={index}
            />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
});
