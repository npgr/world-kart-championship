import React from 'react';
import { CircularProgress, Backdrop } from '@material-ui/core';

const LoadingScreen = () => {
  return (
    <Backdrop data-testid="loading-screen" open invisible>
      <CircularProgress color="secondary" />
    </Backdrop>
  );
};

export default LoadingScreen;
