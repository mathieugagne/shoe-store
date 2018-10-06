import get from 'lodash/get';
import {
  APP_SET_BREADCRUMB,
  APP_SET_QUERY,
  APP_TOGGLE_ORDER_QUERY,
} from './appActions';

const initialState = {
  breadcrumb: [
    {
      label: 'Flash Sale Dashboard',
      to: '/',
    },
    {
      label: 'Overview',
    },
  ],
  query: {},
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case APP_SET_BREADCRUMB:
      return {
        ...state,
        breadcrumb: action.payload.breadcrumb,
      };

    case APP_SET_QUERY:
      return {
        ...state,
        query: action.payload.query,
      };

    // Only support one ordering at a time for now.
    case APP_TOGGLE_ORDER_QUERY:
      return {
        ...state,
        query: {
          ...state.query,
          order: [
            [
              action.payload.key,
              get(state, 'query.order[0][1]') === 'asc' ? 'desc' : 'asc',
            ],
          ],
        },
      };
    default:
      return state;
  }
};

export default appReducer;
