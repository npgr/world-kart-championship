import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { renderWithIntl as render } from '../../utils/test-utils';
import { Provider } from 'react-redux';
import { ApiIndicator, mockStoreRedux } from '../../store/shared';
import { driversDataMockBuilder } from '../../models/fixtures/Drivers';
import DriverDetail from './DriverDetail';

describe('Driver Detail component', () => {
  const MOCK_DRIVER_ID = '1';

  const renderDriverDetail = (
    initialState: object = {
      drivers: { ...driversDataMockBuilder(), isLoading: ApiIndicator.Success },
    }
  ) => {
    const store = { ...mockStoreRedux(initialState), dispatch: jest.fn() };
    return render(
      <Provider store={store}>
        <DriverDetail id={MOCK_DRIVER_ID} />
      </Provider>
    );
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test('it should renders Driver name according data', () => {
    renderDriverDetail();

    expect(screen.queryByText('Padilla Adkins')).toBeVisible();
  });

  test('it should renders Driver age according data', () => {
    renderDriverDetail();

    expect(screen.queryByText('Age: 38')).toBeVisible();
  });

  test('it should renders Driver Classification 0 on loading page', () => {
    renderDriverDetail();

    expect(screen.queryByText('Classification: 0')).toBeVisible();
  });

  test('it should renders Driver Points 0 on loading page', () => {
    renderDriverDetail();

    expect(screen.queryByText('Points: 0')).toBeVisible();
  });

  test('it should renders a Table columns for race positions', () => {
    renderDriverDetail();

    const tableHead = screen.getByRole('row', {
      name: /Race Time Position Points/gi,
    });

    expect(tableHead).toBeVisible();
  });

  test('it should renders a empty table (only head) on page loading', () => {
    renderDriverDetail();

    const tableRows = screen.getAllByRole('row');

    expect(tableRows).toHaveLength(1);
  });

  test('it should renders only the first race after first time interval', () => {
    renderDriverDetail();
    act(() => {
      jest.runOnlyPendingTimers();
    });

    const tableRows = screen.getAllByRole('row');
    const tableRow = screen.getByRole('row', {
      name: /Race 0 1:11:39.515 1 48/gi,
    });

    expect(tableRows).toHaveLength(2);
    expect(tableRow).toBeVisible();
  });

  test('it should update classification after first time interval', () => {
    renderDriverDetail();
    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.queryByText('Classification: 1')).toBeVisible();
  });

  test('it should update Points after firts time interval', () => {
    renderDriverDetail();
    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.queryByText('Points: 48')).toBeVisible();
  });

  test('it should renders all races after run all timers (2 records)', () => {
    renderDriverDetail();

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    [/Race 0 1:11:39.515 1 48/gi, /Race 1 1:17:24.312 1 48/gi].forEach(
      (row) => {
        const tableRow = screen.getByRole('row', {
          name: row,
        });
        expect(tableRow).toBeVisible();
      }
    );
  });

  test('it should renders Total points after run 2 time intervals', async () => {
    renderDriverDetail();
    act(() => {
      jest.runOnlyPendingTimers();
    });
    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.queryByText('Points: 96')).toBeVisible();
  });

  test('it should renders Classification after run 2 time intervals', async () => {
    renderDriverDetail();
    act(() => {
      jest.runOnlyPendingTimers();
    });
    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.queryByText('Classification: 1')).toBeVisible();
  });
});
