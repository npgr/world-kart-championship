import React from 'react';
import MUITable from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import { StyledTableRow } from './Table.styles';

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
    <>
      <TableContainer>
        <MUITable stickyHeader size={size}>
          <TableHead>
            <StyledTableRow>
              {columns.map((column: IColumn) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any) => {
              return (
                <StyledTableRow
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
    </>
  );
};

export default Table;