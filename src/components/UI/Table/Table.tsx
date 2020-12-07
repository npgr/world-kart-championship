import React from 'react';
import MUITable from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import { StyledTableRow, StyledTableCell } from './Table.styles';

interface IColumn {
  id: string;
  label?: string;
  align?: string;
  width?: string;
}

interface ITable {
  columns: IColumn[];
  rows: any[];
  size?: 'small' | 'medium';
}

const Table = ({ columns, rows, size = 'small' }: ITable) => {
  return (
    <TableContainer>
      <MUITable stickyHeader size={size}>
        <TableHead data-testid="table-head">
          <StyledTableRow>
            {columns.map((column: IColumn) => (
              <StyledTableCell key={column.id} variant="head">
                {column.label}
              </StyledTableCell>
            ))}
          </StyledTableRow>
        </TableHead>
        <TableBody data-testid="table-body">
          {rows.map((row: any) => {
            return (
              <StyledTableRow
                data-testid="table-body-row"
                hover
                tabIndex={-1}
                key={row.id}
                onClick={row.onClick}
              >
                {columns.map((column: any) => {
                  const value = row[column.id];
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={column.width && { width: column.width }}
                    >
                      {value}
                    </TableCell>
                  );
                })}
              </StyledTableRow>
            );
          })}
        </TableBody>
      </MUITable>
    </TableContainer>
  );
};

export default Table;
