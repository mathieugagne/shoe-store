import url from 'url';
import {
  STORE_BROWSE_REQUEST,
  STORE_BROWSE_SUCCESS,
  STORE_BROWSE_FAILURE,
} from './storeActions';

const initialState = {
  items: {},
  isLoading: false,
  isAllLoaded: false,
  hasLoadingError: false,
};

const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_BROWSE_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasLoadingError: false,
      };

    case STORE_BROWSE_SUCCESS:
      return {
        ...state,
        items: action.payload.stores.reduce(
          (carry, store) => ({
            ...carry,
            [store.id]: {
              ...store,
              readUrl: url.resolve('/stores/', store.id),
            },
          }),
          state.items,
        ),
        isLoading: false,
        isAllLoaded: true,
        hasLoadingError: false,
      };

    case STORE_BROWSE_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasLoadingError: true,
      };
    default:
      return state;
  }
};

export default storeReducer;
