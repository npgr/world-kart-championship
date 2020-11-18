import styled from "styled-components";
import { AppBar, Typography } from "@material-ui/core";

export const StyledAppBar = styled(AppBar)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey["300"]};
`;

export const StyledTitle = styled(Typography)`
  flex-grow: 1;
`;
