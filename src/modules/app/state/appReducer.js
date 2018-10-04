import { APP_SET_BREADCRUMB } from './appActions';

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
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case APP_SET_BREADCRUMB:
      return {
        ...state,
        breadcrumb: action.payload.breadcrumb,
      };
    default:
      return state;
  }
};

export default appReducer;
