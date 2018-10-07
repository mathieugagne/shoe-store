import { NOTIFICATION_RECEIVED } from './notificationActions';

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
          [action.payload.id]: action.payload,
        },
      };

    default:
      return state;
  }
};

export default notificationReducer;
