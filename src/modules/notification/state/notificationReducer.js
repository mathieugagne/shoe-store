import {
  NOTIFICATION_READ,
  NOTIFICATION_RECEIVED,
  NOTIFICATION_REMOVE_FROM_STACK,
} from './notificationActions';

const initialState = {
  items: {},
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_RECEIVED:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.notification.id]: {
            ...action.payload.notification,
            isInStack: true,
          },
        },
      };

    case NOTIFICATION_READ:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.notificationId]: {
            ...state.items[action.payload.notificationId],
            isRead: true,
            isInStack: false,
          },
        },
      };

    case NOTIFICATION_REMOVE_FROM_STACK:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.notificationId]: {
            ...state.items[action.payload.notificationId],
            isInStack: false,
          },
        },
      };

    default:
      return state;
  }
};

export default notificationReducer;
