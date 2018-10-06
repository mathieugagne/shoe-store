export const APP_SET_BREADCRUMB = 'APP_SET_BREADCRUMB';
export const appSetBreadcrumb = breadcrumb => ({
  type: APP_SET_BREADCRUMB,
  payload: {
    breadcrumb,
  },
});

export const APP_SET_QUERY = 'APP_SET_QUERY';
export const appSetQuery = query => ({
  type: APP_SET_QUERY,
  payload: {
    query,
  },
});

export const APP_TOGGLE_ORDER_QUERY = 'APP_TOGGLE_ORDER_QUERY';
export const appToggleOrderQuery = key => ({
  type: APP_TOGGLE_ORDER_QUERY,
  payload: {
    key,
  },
});
