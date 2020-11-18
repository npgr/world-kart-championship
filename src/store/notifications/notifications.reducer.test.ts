import notificationsReducer, {
  INITIAL_STATE,
  NOTIFICATION_TYPES,
  INotification,
  INotificationState,
} from "./notifications.reducer";
import { NOTIFICATIONS_REDUX_TYPES } from "./notifications.types";

describe("Notifications reducer", () => {
  test("it should add a new notification to array when type is ADD_NOTIFICATION", () => {
    const MOCK_NEW_NOTIFICATION: INotification = {
      type: NOTIFICATION_TYPES.SUCCESS,
      text: "the notification text",
    };
    const EXPECTED_STATE: INotificationState = {
      ...INITIAL_STATE,
      notifications: [{ ...MOCK_NEW_NOTIFICATION, values: {} }],
    };
    const state = notificationsReducer(INITIAL_STATE, {
      type: NOTIFICATIONS_REDUX_TYPES.ADD_NOTIFICATION,
      payload: MOCK_NEW_NOTIFICATION,
    });

    expect(state).toEqual(EXPECTED_STATE);
  });
  test("it should remove a notification by index when type is REMOVE_NOTIFICATION", () => {
    const MOCK_INDEX_TO_REMOVE = 0;
    const MOCK_INITIAL_STATE: INotificationState = {
      notifications: [
        { type: NOTIFICATION_TYPES.WARNING, text: "the warning text" },
        { type: NOTIFICATION_TYPES.ERROR, text: "the error text" },
      ],
    };
    const EXPECTED_STATE: INotificationState = {
      notifications: [
        { type: NOTIFICATION_TYPES.ERROR, text: "the error text" },
      ],
    };
    const state = notificationsReducer(MOCK_INITIAL_STATE, {
      type: NOTIFICATIONS_REDUX_TYPES.REMOVE_NOTIFICATION,
      payload: MOCK_INDEX_TO_REMOVE,
    });

    expect(state).toEqual(EXPECTED_STATE);
  });
});
