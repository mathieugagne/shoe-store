import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import compose from 'recompose/compose';
import rootReducer from './rootReducer';
import rootEpics from './rootEpics';

let reduxStore;

/* eslint-disable no-underscore-dangle */
const storeCompose =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
/* eslint-enable no-underscore-dangle */

// eslint-disable-next-line import/prefer-default-export
export const getStore = (forceCreationOfNewStore = false) => {
  if (!reduxStore || forceCreationOfNewStore) {
    // To easily unit test our epics we could do something like this
    // https://redux-observable.js.org/docs/recipes/InjectingDependenciesIntoEpics.html
    const epicMiddleware = createEpicMiddleware();

    reduxStore = createStore(
      rootReducer,
      /**
       * Browser tool to visualize the Redux store & actions
       * @see https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
       */
      storeCompose(applyMiddleware(epicMiddleware)),
    );

    epicMiddleware.run(rootEpics);
  }

  return reduxStore;
};
