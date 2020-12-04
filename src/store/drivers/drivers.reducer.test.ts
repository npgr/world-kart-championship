import driversReducer, { INITIAL_STATE } from './drivers.reducer';
import { DRIVERS_TYPES } from './drivers.types';
import { ApiIndicator } from '../shared';

describe('Drivers reducer', () => {
  test('should set isLoading indicator on start when GET_DRIVERS_START', () => {
    const state = driversReducer(INITIAL_STATE, {
      type: DRIVERS_TYPES.GET_DRIVERS_START,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      isLoading: ApiIndicator.Start,
    });
  });

  test('should load data on getDrivers success', () => {
    const MOCK_DATA = {
      drivers: ['driver'],
      races: ['races'],
      driversRaces: ['drivers Races'],
    };

    const state = driversReducer(
      { ...INITIAL_STATE, isLoading: ApiIndicator.Start },
      {
        type: DRIVERS_TYPES.GET_DRIVERS_SUCCESS,
        payload: MOCK_DATA,
      }
    );
    expect(state).toEqual({
      ...INITIAL_STATE,
      ...MOCK_DATA,
      isLoading: ApiIndicator.Success,
    });
  });

  test('should set isLoading indicator on Failure when GET_DRIVERS_FAILURE', () => {
    const state = driversReducer(
      { ...INITIAL_STATE, isLoading: ApiIndicator.Start },
      {
        type: DRIVERS_TYPES.GET_DRIVERS_FAILURE,
      }
    );

    expect(state).toEqual({
      ...INITIAL_STATE,
      isLoading: ApiIndicator.Failure,
    });
  });
});
