import { combineReducers } from 'redux';
import drivers from './drivers/drivers.reducer';
import notifications from './notifications/notifications.reducer';

export default combineReducers({
  drivers,
  notifications,
});
