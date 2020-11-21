import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { mockStoreRedux } from '../../store/shared';
import { INITIAL_STATE } from '../../store/drivers/drivers.reducer';
import Drivers from './Drivers';

describe('Drivers page', () => {
  const store = mockStoreRedux(INITIAL_STATE);

  const renderDriversPage = () =>
    render(
      <Provider store={store}>
        <Drivers />
      </Provider>
    );

  test('renders page', () => {
    renderDriversPage();
    const homeMessage = screen.getByText(/Drivers page/i);

    expect(homeMessage).toBeInTheDocument();
  });
});
