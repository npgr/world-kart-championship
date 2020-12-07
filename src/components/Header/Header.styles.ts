import styled, { css } from 'styled-components';
import { AppBar, Typography } from '@material-ui/core';

export const StyledAppBar = styled(AppBar)`
  ${({ theme }) => css`
    background-color: ${theme.palette.primary.main};
    color: white;
  `}
`;

export const StyledTitle = styled(Typography)`
  flex-grow: 1;
`;
