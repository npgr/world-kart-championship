import { createSelector } from "reselect";

const notificationsSelector = (state: any) => state.notifications;

export const selectNotifications = createSelector(
  [notificationsSelector],
  (notifications) => notifications.notifications
);
