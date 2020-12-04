import { AnyAction } from 'redux';
import { DRIVERS_TYPES } from './drivers.types';
import { Driver, Race, DriverRace } from '../../models';
import { ApiIndicator } from '../shared';

export interface IDriversState {
  drivers: Driver[];
  races: Race[];
  driversRaces: DriverRace[];
  isLoading: ApiIndicator;
}

export const INITIAL_STATE: IDriversState = {
  drivers: [],
  races: [],
  driversRaces: [],
  isLoading: ApiIndicator.Empty,
};

const getDriversStart = (state: any, { payload }: AnyAction) => ({
  ...state,
  drivers: [],
  isLoading: ApiIndicator.Start,
});

const getDriversSuccess = (state: any, { payload }: AnyAction) => ({
  ...state,
  ...payload,
  isLoading: ApiIndicator.Success,
});

const getDriversFailure = (state: any, { payload }: AnyAction) => ({
  ...state,
  isLoading: ApiIndicator.Failure,
});

const reducerMap = {
  [DRIVERS_TYPES.GET_DRIVERS_START]: getDriversStart,
  [DRIVERS_TYPES.GET_DRIVERS_SUCCESS]: getDriversSuccess,
  [DRIVERS_TYPES.GET_DRIVERS_FAILURE]: getDriversFailure,
};

const reducer = (state = INITIAL_STATE, action: AnyAction): any =>
  reducerMap[action.type] ? reducerMap[action.type](state, action) : state;

export default reducer;
