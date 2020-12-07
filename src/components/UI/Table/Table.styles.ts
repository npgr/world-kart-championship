import styled, { css } from 'styled-components';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export const StyledTableRow = styled(TableRow)`
  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
    `}
`;

export const StyledTableCell = styled(TableCell)`
  ${({ theme }) => css`
    background-color: ${theme.palette.primary.light};
    color: white;
  `}
`;
