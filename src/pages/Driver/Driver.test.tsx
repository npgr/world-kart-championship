import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { screen } from '@testing-library/react';
import { renderWithIntl as render } from '../../utils/test-utils';
import { Provider } from 'react-redux';
import { ApiIndicator, mockStoreRedux } from '../../store/shared';
import * as actions from '../../store/drivers/drivers.actions';
import { driversDataMockBuilder } from '../../models/fixtures/Drivers';
import { INITIAL_STATE } from '../../store/drivers/drivers.reducer';
import ROUTES from '../../routes';
import Driver from './Driver';

const getDriversSpy = jest.spyOn(actions, 'getDrivers');

describe('Driver page', () => {
  const history = createBrowserHistory();
  const MOCK_DRIVER_ID = '1';

  history.push(ROUTES.DRIVER.replace(':id', MOCK_DRIVER_ID));

  const renderDriverPage = (
    initialState: object = {
      drivers: { ...driversDataMockBuilder(), isLoading: ApiIndicator.Success },
    }
  ) => {
    const store = { ...mockStoreRedux(initialState), dispatch: jest.fn() };
    return render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={ROUTES.DRIVER} component={Driver} />
        </Router>
      </Provider>
    );
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("it should dispatch 'get drivers' when initial state", () => {
    renderDriverPage({ drivers: INITIAL_STATE });

    expect(getDriversSpy).toHaveBeenCalledTimes(1);
  });

  test('it should renders a loading screen when api starts loading', () => {
    const { getByTestId } = renderDriverPage({
      drivers: {
        ...INITIAL_STATE,
        isLoading: ApiIndicator.Start,
      },
    });

    expect(getByTestId('loading-screen')).toBeVisible();
  });

  test('it should hide the loading screen when api success', () => {
    const { queryByTestId } = renderDriverPage({
      drivers: {
        ...INITIAL_STATE,
        isLoading: ApiIndicator.Success,
      },
    });

    expect(queryByTestId('loading-screen')).not.toBeInTheDocument();
  });

  test('it should hide the loading screen when api fails', () => {
    const { queryByTestId } = renderDriverPage({
      drivers: {
        ...INITIAL_STATE,
        isLoading: ApiIndicator.Failure,
      },
    });

    expect(queryByTestId('loading-screen')).not.toBeInTheDocument();
  });

  test('it should show the Driver Detail when api success', () => {
    renderDriverPage({
      drivers: {
        ...INITIAL_STATE,
        isLoading: ApiIndicator.Success,
      },
    });

    const tableHead = screen.getByRole('row', {
      name: /Race Time Position Points/gi,
    });

    expect(tableHead).toBeVisible();
  });
});
