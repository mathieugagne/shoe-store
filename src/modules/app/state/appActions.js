export const APP_SET_BREADCRUMB = 'APP_SET_BREADCRUMB';
export const appSetBreadcrumb = breadcrumb => ({
  type: APP_SET_BREADCRUMB,
  payload: {
    breadcrumb,
  },
});
