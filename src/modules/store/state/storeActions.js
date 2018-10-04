export const STORE_BROWSE_REQUEST = 'STORE_BROWSE_REQUEST';
export const storeBrowseRequest = () => ({
  type: STORE_BROWSE_REQUEST,
});

export const STORE_BROWSE_SUCCESS = 'STORE_BROWSE_SUCCESS';
export const storeBrowseSuccess = stores => ({
  type: STORE_BROWSE_SUCCESS,
  payload: {
    stores,
  },
});

export const STORE_BROWSE_FAILURE = 'STORE_BROWSE_FAILURE';
export const storeBrowseFailure = () => ({
  type: STORE_BROWSE_FAILURE,
});
