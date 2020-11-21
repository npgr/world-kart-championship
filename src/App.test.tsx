import React from 'react';
import { Provider } from 'react-redux';
import { screen } from '@testing-library/react';
import { renderWithIntl as render } from './utils/test-utils';
import { mockStoreRedux } from './store/shared';
import { INITIAL_STATE as DRIVERS_INITIAL_STATE } from './store/drivers/drivers.reducer';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import ROUTES from './routes';
import App from './App';

describe('App', () => {
  let store: any;

  const INITIAL_STATE = {
    driver: DRIVERS_INITIAL_STATE,
  };
  const history = createBrowserHistory();

  beforeEach(() => {
    store = mockStoreRedux(INITIAL_STATE);
  });

  const renderApp = () =>
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );

  test('Not found page', async () => {
    history.push('nonexistent-url');
    renderApp();

    const lazyPageContent = await screen.findByText(/Not Found page/i);
    expect(lazyPageContent).toBeInTheDocument();
  });

  test('Show Home page', async () => {
    history.push(ROUTES.HOME);
    renderApp();

    const lazyPageContent = await screen.findByText(/Drivers page/i);
    expect(lazyPageContent).toBeInTheDocument();
  });
});
