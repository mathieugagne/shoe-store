export const SHOE_BROWSE_REQUEST = 'SHOE_BROWSE_REQUEST';
export const shoeBrowseRequest = () => ({
  type: SHOE_BROWSE_REQUEST,
});

export const SHOE_BROWSE_SUCCESS = 'SHOE_BROWSE_SUCCESS';
export const shoeBrowseSuccess = shoes => ({
  type: SHOE_BROWSE_SUCCESS,
  payload: {
    shoes,
  },
});

export const SHOE_BROWSE_FAILURE = 'SHOE_BROWSE_FAILURE';
export const shoeBrowseFailure = () => ({
  type: SHOE_BROWSE_FAILURE,
});
