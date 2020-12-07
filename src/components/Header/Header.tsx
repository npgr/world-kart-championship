import React from 'react';
import { StyledTitle, StyledAppBar } from './Header.styles';
import { Toolbar } from '@material-ui/core';

const Header = () => (
  <StyledAppBar position="sticky" color="inherit" elevation={0}>
    <Toolbar>
      <StyledTitle variant="h6">World Kart Championship</StyledTitle>
    </Toolbar>
  </StyledAppBar>
);

export default Header;
