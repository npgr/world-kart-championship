import configureMockStore from 'redux-mock-store';
import { addNotification, removeNotification } from './notifications.actions';
import { NOTIFICATIONS_REDUX_TYPES } from './notifications.types';
import thunk from 'redux-thunk';
import { INITIAL_STATE, NOTIFICATION_TYPES } from './notifications.reducer';

describe('Notifications actions', () => {
  let store: any;
  const mockStore = configureMockStore([thunk]);

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
  });

  test('should dispatch data action to add notification', async () => {
    const MOCK_TYPE_NOTIFICATION = NOTIFICATION_TYPES.SUCCESS;
    const MOCK_TEXT_NOTIFICATION = 'mock text';
    const MOCK_VALUES_NOTIFICATION = { mockValue: 1 };

    const EXPECTED_ACTIONS = [
      {
        type: NOTIFICATIONS_REDUX_TYPES.ADD_NOTIFICATION,
        payload: {
          type: MOCK_TYPE_NOTIFICATION,
          text: MOCK_TEXT_NOTIFICATION,
          values: MOCK_VALUES_NOTIFICATION,
        },
      },
    ];
    await store.dispatch(
      addNotification(
        MOCK_TYPE_NOTIFICATION,
        MOCK_TEXT_NOTIFICATION,
        MOCK_VALUES_NOTIFICATION
      )
    );
    const actualActions = await store.getActions();
    expect(actualActions).toEqual(EXPECTED_ACTIONS);
  });

  test('should dispatch data action to remove Notification', async () => {
    const MOCK_NOTIFICATION_INDEX = 2;
    const EXPECTED_ACTIONS = [
      {
        type: NOTIFICATIONS_REDUX_TYPES.REMOVE_NOTIFICATION,
        payload: MOCK_NOTIFICATION_INDEX,
      },
    ];
    await store.dispatch(removeNotification(MOCK_NOTIFICATION_INDEX));
    const actualActions = await store.getActions();
    expect(actualActions).toEqual(EXPECTED_ACTIONS);
  });
});
