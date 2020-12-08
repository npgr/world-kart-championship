import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { screen } from '@testing-library/react';
import { renderWithIntl as render } from '../../utils/test-utils';
import { ApiIndicator, mockStoreRedux } from '../../store/shared';
import * as actions from '../../store/drivers/drivers.actions';
import userEvent from '@testing-library/user-event';
import { driversDataMockBuilder } from '../../models/fixtures/Drivers';
import { INITIAL_STATE } from '../../store/drivers/drivers.reducer';
import ROUTES from '../../routes';
import Classification from './Classification';

const getDriversSpy = jest.spyOn(actions, 'getDrivers');

describe('Classification page', () => {
  const history = createBrowserHistory();

  const renderClassificationPage = (initialState: object) => {
    const store = { ...mockStoreRedux(initialState), dispatch: jest.fn() };
    return render(
      <Provider store={store}>
        <Classification history={history} />
      </Provider>
    );
  };

  test('it should renders Classification page', () => {
    renderClassificationPage({ drivers: INITIAL_STATE });
    const title = screen.getByRole('heading', {
      name: /Classification/i,
    });

    expect(title).toBeInTheDocument();
  });

  test("it should dispatch 'get drivers' with the load of page", () => {
    renderClassificationPage({ drivers: INITIAL_STATE });

    expect(getDriversSpy).toHaveBeenCalledTimes(1);
  });

  test('it should renders a Table columns for classification', () => {
    const MOCK_STATE = {
      drivers: {
        ...driversDataMockBuilder(),
        isLoading: ApiIndicator.Success,
      },
    };
    const { getByRole } = renderClassificationPage(MOCK_STATE);

    const tableHead = getByRole('row', {
      name: /Pos Name Age Team Points/gi,
    });

    expect(tableHead).toBeVisible();
  });

  test('it should renders a table on data success', () => {
    const MOCK_STATE = {
      drivers: {
        ...driversDataMockBuilder(),
        isLoading: ApiIndicator.Success,
      },
    };
    const { getByRole } = renderClassificationPage(MOCK_STATE);

    [
      /1 Padilla Adkins 38 EURON 96/gi,
      /2 Richards Floyd 39 VENDBLEND 88/gi,
    ].forEach((driver) => {
      expect(getByRole('row', { name: driver })).toBeVisible();
    });
  });

  test('it should renders a loading screen when api starts loading', () => {
    const { getByTestId } = renderClassificationPage({
      drivers: {
        ...INITIAL_STATE,
        isLoading: ApiIndicator.Start,
      },
    });

    expect(getByTestId('loading-screen')).toBeVisible();
  });

  test('it should hide the loading screen when api success', () => {
    const { queryByTestId } = renderClassificationPage({
      drivers: {
        ...INITIAL_STATE,
        isLoading: ApiIndicator.Success,
      },
    });

    expect(queryByTestId('loading-screen')).not.toBeInTheDocument();
  });

  test('it should hide the loading screen when api fails', () => {
    const { queryByTestId } = renderClassificationPage({
      drivers: {
        ...INITIAL_STATE,
        isLoading: ApiIndicator.Failure,
      },
    });

    expect(queryByTestId('loading-screen')).not.toBeInTheDocument();
  });

  test('It should go driver page when clicks on row', () => {
    const MOCK_STATE = {
      drivers: {
        ...driversDataMockBuilder(),
        isLoading: ApiIndicator.Success,
      },
    };
    const { getByRole } = renderClassificationPage(MOCK_STATE);

    const firstRow = getByRole('row', {
      name: /1 Padilla Adkins 38 EURON 96/gi,
    });

    userEvent.click(firstRow);

    expect(history.location.pathname).toBe(ROUTES.DRIVER.replace(':id', '1'));
  });
});
