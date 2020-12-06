import styled, { css } from 'styled-components';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export const StyledTableHead = styled(TableHead)`
  ${({ theme }) => css`
    font-weight: bold;
    th {
      padding-top: 0.7rem;
      padding-bottom: 0.7rem;
    }
  `}
`;

export const StyledTableRow = styled(TableRow)`
  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
    `}
`;
