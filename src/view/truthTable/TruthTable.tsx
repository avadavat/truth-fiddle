import React from 'react';
import { FixedSizeList as List, FixedSizeGrid as Grid } from 'react-window';
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

/**
 * Converts a QueryPermutation object to a list of the strings
 * to display for its row in the Truth Table.
 * @param permutation - The QueryPermutation object
 * @param isHeaderRow - Whether the row is to be represented as the table header. If
 * so we display the variable names instead of their values.
 */
const getPermutationAsRow = (
  permutation: QueryPermutation,
  isHeaderRow: boolean
): string[] => {
  const result: string[] = [];

  // append all variable results
  permutation.queryParameters.forEach((value: boolean, key: string) => {
    result.push(isHeaderRow ? key : String(value));
  });

  // append final result
  // TODO: Display the full query instead of 'Result'
  result.push(isHeaderRow ? 'Result' : String(permutation.value));

  return result;
};

/**
 * Converts a list of QueryPermutation objects into a grid of
 * the strings to display in the Truth Table.
 */
const getDataAsGrid = (permutations: QueryPermutation[]): string[][] => {
  if (permutations.length == 0) {
    return [];
  }

  const result: string[][] = [];

  // create header
  result.push(getPermutationAsRow(permutations[0], /*isHeaderRow*/ true));

  // create body
  permutations.forEach(permutation => {
    result.push(getPermutationAsRow(permutation, /*isHeaderRow*/ false));
  });

  return result;
};

const gridHeight = 500;
const gridWidth = 1200;
const rowHeight = 50;

export const TruthTable = React.memo(function TruthTable(
  props: TruthTableProps
) {
  const classes = useStyles();
  const { rows } = props;

  const gridData = getDataAsGrid(rows);
  const rowCount: number = gridData.length;
  const columnCount: number = rowCount > 0 ? gridData[0].length : 0;
  const columnWidth: number =
    columnCount > 0 ? Math.floor(gridHeight / columnCount) : 0;

  return (
    <Paper className={classes.root}>
      <Grid
        height={gridHeight}
        columnCount={columnCount}
        rowCount={rowCount}
        rowHeight={rowHeight}
        columnWidth={columnWidth}
        width={gridWidth}
      >
        {({ columnIndex, rowIndex, style }) => (
          <div style={style}>{gridData[rowIndex][columnIndex]}</div>
        )}
      </Grid>
    </Paper>
  );
});
