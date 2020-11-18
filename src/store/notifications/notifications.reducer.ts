import { AnyAction } from "redux";
import { NOTIFICATIONS_REDUX_TYPES } from "./notifications.types";

export enum NOTIFICATION_TYPES {
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
  INFO = "info",
}

export interface INotification {
  type: NOTIFICATION_TYPES | null;
  text: string | null;
  values?: Object;
}

export interface INotificationState {
  notifications: INotification[];
}

export const INITIAL_STATE: INotificationState = {
  notifications: [],
};

const addNotification = (
  state: INotificationState,
  { payload }: AnyAction
): INotificationState => ({
  ...state,
  notifications: [
    ...state.notifications,
    { type: payload.type, text: payload.text, values: payload.values || {} },
  ],
});

const removeNotification = (
  state: INotificationState,
  { payload }: AnyAction
): INotificationState => ({
  ...state,
  notifications: state.notifications.filter(
    (notification, index) => index !== payload
  ),
});

const reducerMap = {
  [NOTIFICATIONS_REDUX_TYPES.ADD_NOTIFICATION]: addNotification,
  [NOTIFICATIONS_REDUX_TYPES.REMOVE_NOTIFICATION]: removeNotification,
};

const reducer = (
  state = INITIAL_STATE,
  action: AnyAction
): INotificationState =>
  reducerMap[action.type] ? reducerMap[action.type](state, action) : state;

export default reducer;
