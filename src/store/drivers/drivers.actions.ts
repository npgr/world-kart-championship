import api from '../../api/api';
import { apiCallRedux, StoreDispatch } from '../shared';
import { DRIVERS_TYPES } from './drivers.types';

export const getDrivers = () => (dispatch: StoreDispatch) => {
  dispatch(
    apiCallRedux({
      actionType: DRIVERS_TYPES.GET_DRIVERS,
      apiCall: () => api.getDrivers(),
    })
  );
};
