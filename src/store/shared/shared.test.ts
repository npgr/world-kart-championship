import thunk from 'redux-thunk';
import axios, { AxiosStatic } from 'axios';
import configureMockStore from 'redux-mock-store';
import {
  apiCallRedux,
  IApiCallReduxParams,
  mockStoreRedux,
  validateResponseItem,
  DataType,
} from './shared';

jest.mock('axios');

describe('Redux shared', () => {
  let mockedAxios: jest.Mocked<AxiosStatic>;
  const mockStore = configureMockStore([thunk]);
  let store: any;

  beforeEach(() => {
    mockedAxios = axios as jest.Mocked<AxiosStatic>;
    store = mockStore({});
  });

  test('mockStoreRedux(initialState) -> redux store', () => {
    const MOCK_INITIAL_STATE = { state: 'the initial state' };
    const mockedStore = mockStoreRedux(MOCK_INITIAL_STATE);

    expect(mockedStore.getState()).toBe(MOCK_INITIAL_STATE);
  });

  test('apiCallRedux(...) actions and api call on success', async () => {
    const MOCK_API_URL = '/test/success/url';
    const MOCK_ACTION = 'TEST_ACTION';
    const MOCK_DATA = 'the mock data';
    const EXPECTED_ACTIONS = [
      { type: `${MOCK_ACTION}_START` },
      { type: `${MOCK_ACTION}_SUCCESS`, payload: MOCK_DATA },
    ];

    mockedAxios.get.mockResolvedValueOnce({
      data: MOCK_DATA,
    });

    const MOCK_PARAMS: IApiCallReduxParams = {
      actionType: MOCK_ACTION,
      apiCall: () => axios.get(MOCK_API_URL),
      builder: (data: any) => data,
    };

    await store.dispatch(apiCallRedux(MOCK_PARAMS));

    const actualActions = await store.getActions();

    expect(mockedAxios.get).toHaveBeenCalledWith(MOCK_API_URL);
    expect(EXPECTED_ACTIONS).toEqual(actualActions);
  });

  test('apiCallRedux(...) actions and api call on success with builder', async () => {
    const MOCK_API_URL = '/test/success/url';
    const MOCK_ACTION = 'TEST_ACTION';
    const MOCK_BUILDER_DATA = { data: 'success' };
    const MOCK_DATA = { object1: MOCK_BUILDER_DATA };
    const MOCK_BUILDER_FUNCTION = (data: any) => data.object1;
    const EXPECTED_ACTIONS = [
      { type: `${MOCK_ACTION}_START` },
      { type: `${MOCK_ACTION}_SUCCESS`, payload: MOCK_BUILDER_DATA },
    ];

    mockedAxios.get.mockResolvedValueOnce({
      data: MOCK_DATA,
    });

    const MOCK_PARAMS: IApiCallReduxParams = {
      actionType: MOCK_ACTION,
      apiCall: () => axios.get(MOCK_API_URL),
      builder: MOCK_BUILDER_FUNCTION,
    };

    await store.dispatch(apiCallRedux(MOCK_PARAMS));

    const actualActions = await store.getActions();

    expect(mockedAxios.get).toHaveBeenCalledWith(MOCK_API_URL);
    expect(EXPECTED_ACTIONS).toEqual(actualActions);
  });

  test('apiCallRedux(...) actions and api call on failure', async () => {
    const MOCK_API_URL = '/test/error/url';
    const MOCK_ACTION = 'TEST_ACTION';
    const MOCK_ERROR = {
      message: 'the mock error',
    };
    const EXPECTED_ACTIONS = [
      { type: `${MOCK_ACTION}_START` },
      { type: `${MOCK_ACTION}_FAILURE`, payload: MOCK_ERROR },
    ];

    mockedAxios.get.mockRejectedValue(MOCK_ERROR);

    const MOCK_PARAMS: IApiCallReduxParams = {
      actionType: MOCK_ACTION,
      apiCall: () => axios.get(MOCK_API_URL),
      builder: (data: any) => data,
    };

    await store.dispatch(apiCallRedux(MOCK_PARAMS));

    const actualActions = await store.getActions();

    expect(mockedAxios.get).toHaveBeenCalledWith(MOCK_API_URL);
    expect(EXPECTED_ACTIONS).toEqual(actualActions);
  });

  describe('validateItemResponse()', () => {
    test('it should not throw errors when data structure is valid', () => {
      const MOCK_ITEM = {
        field1: 'value 1',
        field2: 99,
        field3: [],
        field4: true,
        field5: {},
        field6: 6.5,
      };
      const MOCK_FIELDS: { [key: string]: DataType } = {
        field1: 'string',
        field2: 'number',
        field3: 'array',
        field4: 'boolean',
        field5: 'object',
        field6: 'number',
      };
      const MOCK_ERROR_FUNCTION = (field: string, objectName: string) =>
        `error ${objectName}${field}`;

      expect(() =>
        validateResponseItem(
          MOCK_ITEM,
          MOCK_FIELDS,
          MOCK_ERROR_FUNCTION,
          MOCK_ERROR_FUNCTION
        )
      ).not.toThrowError();
    });

    test('it should allow to validate null value on properties', () => {
      const MOCK_ITEM = {
        field1: null,
      };
      const MOCK_FIELDS: {
        [key: string]: { type: string; allowNull: boolean };
      } = {
        field1: { type: 'array', allowNull: true },
      };
      const MOCK_ERROR_FUNCTION = (field: string, objectName: string) =>
        `error ${objectName}${field}`;

      expect(() =>
        validateResponseItem(
          MOCK_ITEM,
          MOCK_FIELDS,
          MOCK_ERROR_FUNCTION,
          MOCK_ERROR_FUNCTION
        )
      ).not.toThrowError();
    });

    test('it should throw error when field could not have null value and data value is null', () => {
      const MOCK_ITEM = {
        field1: null,
      };
      const MOCK_FIELDS = {
        field1: { type: 'array', allowNull: false },
      };
      const MOCK_ERROR_FUNCTION = (field: string, objectName: string) =>
        `error ${objectName}${field}`;

      expect(() =>
        validateResponseItem(
          MOCK_ITEM,
          MOCK_FIELDS,
          MOCK_ERROR_FUNCTION,
          MOCK_ERROR_FUNCTION
        )
      ).toThrowError();
    });

    test('it should throw error when missing field in data', () => {
      const MOCK_ITEM = {
        field1: 'value 1',
      };
      const MOCK_FIELDS = {
        field1: 'string',
        field2: { type: 'number' },
      };
      const MOCK_ERROR_FUNCTION = (field: string, objectName: string) =>
        `error missing field: ${objectName}${field}`;
      const EXPECTED_RESPONSE = 'error missing field: field2';

      expect(() =>
        validateResponseItem(
          MOCK_ITEM,
          MOCK_FIELDS,
          MOCK_ERROR_FUNCTION,
          MOCK_ERROR_FUNCTION
        )
      ).toThrowError(EXPECTED_RESPONSE);
    });

    test('it should throw error when field type is invalid in data', () => {
      const MOCK_ITEM = {
        field1: 'value 1',
      };
      const MOCK_FIELDS = {
        field1: 'number',
      };
      const MOCK_ERROR_FUNCTION = (field: string, objectName: string) =>
        `error invalid type on field: ${objectName}${field}`;
      const EXPECTED_RESPONSE = 'error invalid type on field: field1';

      expect(() =>
        validateResponseItem(
          MOCK_ITEM,
          MOCK_FIELDS,
          MOCK_ERROR_FUNCTION,
          MOCK_ERROR_FUNCTION
        )
      ).toThrowError(EXPECTED_RESPONSE);
    });

    test('it should throw error when field type is invalid in data and allows null', () => {
      const MOCK_ITEM = {
        field1: 'value 1',
      };
      const MOCK_FIELDS = {
        field1: { type: 'number', allowNull: true },
      };
      const MOCK_ERROR_FUNCTION = (field: string, objectName: string) =>
        `error invalid type on field: ${objectName}${field}`;
      const EXPECTED_RESPONSE = 'error invalid type on field: field1';

      expect(() =>
        validateResponseItem(
          MOCK_ITEM,
          MOCK_FIELDS,
          MOCK_ERROR_FUNCTION,
          MOCK_ERROR_FUNCTION
        )
      ).toThrowError(EXPECTED_RESPONSE);
    });

    test('it should throw error when field type is invalid in data and does not allow null', () => {
      const MOCK_ITEM = {
        field1: 'value 1',
      };
      const MOCK_FIELDS = {
        field1: { type: 'number', allowNull: false },
      };
      const MOCK_ERROR_FUNCTION = (field: string, objectName: string) =>
        `error invalid type on field: ${objectName}${field}`;
      const EXPECTED_RESPONSE = 'error invalid type on field: field1';

      expect(() =>
        validateResponseItem(
          MOCK_ITEM,
          MOCK_FIELDS,
          MOCK_ERROR_FUNCTION,
          MOCK_ERROR_FUNCTION
        )
      ).toThrowError(EXPECTED_RESPONSE);
    });
  });
});
