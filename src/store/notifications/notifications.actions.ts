import { NOTIFICATIONS_REDUX_TYPES } from './notifications.types';

export const addNotification = (
  type: string,
  text: string,
  values?: object
) => ({
  type: NOTIFICATIONS_REDUX_TYPES.ADD_NOTIFICATION,
  payload: { type, text, values },
});

export const removeNotification = (index: number) => ({
  type: NOTIFICATIONS_REDUX_TYPES.REMOVE_NOTIFICATION,
  payload: index,
});
