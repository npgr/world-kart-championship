import { AnyAction } from 'redux';
import { DRIVERS_TYPES } from './drivers.types';
import { Driver, Race, DriverRace } from '../../models';

export interface IDriversState {
  drivers: Driver[];
  races: Race[];
  driversRaces: DriverRace[];
  isLoading: boolean;
}

export const INITIAL_STATE: IDriversState = {
  drivers: [],
  races: [],
  driversRaces: [],
  isLoading: false,
};

const getDriversStart = (state: any, { payload }: AnyAction) => ({
  ...state,
  drivers: [],
  isLoading: true,
});

const getDriversSuccess = (state: any, { payload }: AnyAction) => ({
  ...state,
  drivers: payload,
  isLoading: false,
});

const getDriversFailure = (state: any, { payload }: AnyAction) => ({
  ...state,
  isLoading: false,
});

const reducerMap = {
  [DRIVERS_TYPES.GET_DRIVERS_START]: getDriversStart,
  [DRIVERS_TYPES.GET_DRIVERS_SUCCESS]: getDriversSuccess,
  [DRIVERS_TYPES.GET_DRIVERS_FAILURE]: getDriversFailure,
};

const reducer = (state = INITIAL_STATE, action: AnyAction): any =>
  reducerMap[action.type] ? reducerMap[action.type](state, action) : state;

export default reducer;
