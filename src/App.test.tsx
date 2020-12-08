import React from 'react';
import { Provider } from 'react-redux';
import { screen } from '@testing-library/react';
import { renderWithIntl as render } from './utils/test-utils';
import { ApiIndicator, mockStoreRedux } from './store/shared';
import { INITIAL_STATE as DRIVERS_INITIAL_STATE } from './store/drivers/drivers.reducer';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import ROUTES from './routes';
import App from './App';
import { driversDataMockBuilder } from './models/fixtures/Drivers';

describe('App', () => {
  const INITIAL_STATE = {
    driver: DRIVERS_INITIAL_STATE,
  };
  const history = createBrowserHistory();

  const renderApp = (
    initialState: object = {
      drivers: { ...driversDataMockBuilder(), isLoading: ApiIndicator.Success },
    }
  ) => {
    const store = { ...mockStoreRedux(initialState), dispatch: jest.fn() };
    return render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
  };

  test('it should Not found page', async () => {
    history.push('non-existent-url');
    renderApp({
      drivers: INITIAL_STATE,
    });

    const lazyPageContent = await screen.findByText(/Not Found page/i);
    expect(lazyPageContent).toBeInTheDocument();
  });

  test('it should renders Home page', async () => {
    history.push(ROUTES.HOME);
    renderApp();

    const lazyPageContent = await screen.findByRole('heading', {
      name: /Classification/i,
    });

    expect(lazyPageContent).toBeInTheDocument();
  });

  test('it should renders Driver page', async () => {
    history.push(ROUTES.DRIVER.replace(':id', '1'));
    renderApp();

    const tableHead = await screen.findByRole('row', {
      name: /Race Time Position Points/gi,
    });

    expect(tableHead).toBeInTheDocument();
  });
});
