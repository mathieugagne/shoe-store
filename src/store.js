import { createStore } from 'redux';
import rootReducer from './rootReducer';

let reduxStore;

/* eslint-disable no-underscore-dangle, import/prefer-default-export */
export const getStore = (forceCreationOfNewStore = false) => {
  if (!reduxStore || forceCreationOfNewStore) {
    reduxStore = createStore(
      rootReducer,
      /**
       * Browser tool to visualize the Redux store & actions
       * @see https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
       */
      typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
    );
  }

  return reduxStore;
};
/* eslint-enable */
