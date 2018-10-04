import {
  SHOE_BROWSE_REQUEST,
  SHOE_BROWSE_SUCCESS,
  SHOE_BROWSE_FAILURE,
} from './shoeActions';

const initialState = {
  items: {},
  isLoading: false,
  isAllLoaded: false,
  hasLoadingError: false,
};

const shoeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOE_BROWSE_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasLoadingError: false,
      };

    case SHOE_BROWSE_SUCCESS:
      return {
        ...state,
        items: action.payload.shoes.reduce(
          (carry, shoe) => ({
            ...carry,
            [shoe.id]: shoe,
          }),
          state.items,
        ),
        isLoading: false,
        isAllLoaded: true,
        hasLoadingError: false,
      };

    case SHOE_BROWSE_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasLoadingError: true,
      };
    default:
      return state;
  }
};

export default shoeReducer;
