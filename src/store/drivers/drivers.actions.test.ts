import thunk from 'redux-thunk';
import axios, { AxiosStatic } from 'axios';
import configureMockStore from 'redux-mock-store';
import { getDrivers } from './drivers.actions';
import { INITIAL_STATE } from './drivers.reducer';
import { driversDataMockBuilder } from '../../models/fixtures/Drivers';
import { driversResponseMockBuilder } from '../../models/fixtures/DriversResponse';

jest.mock('axios');
const mockStore = configureMockStore([thunk]);

let mockedAxios: jest.Mocked<AxiosStatic>;

let store: any;

beforeEach(() => {
  mockedAxios = axios as jest.Mocked<AxiosStatic>;
  store = mockStore({ drivers: INITIAL_STATE });
});

describe('getDrivers action', () => {
  const MOCK_DRIVERS_RESPONSE = driversResponseMockBuilder();
  const MOCK_DRIVERS_DATA = driversDataMockBuilder();

  test('it should dispatch data actions on success', async () => {
    const EXPECTED_ACTIONS = [
      { type: 'GET_DRIVERS_START' },
      {
        type: 'GET_DRIVERS_SUCCESS',
        payload: MOCK_DRIVERS_DATA,
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({
      data: MOCK_DRIVERS_RESPONSE,
    });

    await store.dispatch(getDrivers());

    const actualActions = await store.getActions();

    expect(actualActions).toEqual(EXPECTED_ACTIONS);
  });

  test('it should dispatch failure actions on error', async () => {
    const MOCK_ERROR = { message: 'get drivers error' };
    const EXPECTED_ACTIONS = [
      { type: 'GET_DRIVERS_START' },
      { type: 'GET_DRIVERS_FAILURE', payload: MOCK_ERROR },
    ];

    mockedAxios.get.mockRejectedValueOnce(MOCK_ERROR);

    await store.dispatch(getDrivers());
    const actualActions = await store.getActions();

    expect(actualActions).toEqual(EXPECTED_ACTIONS);
  });
});
