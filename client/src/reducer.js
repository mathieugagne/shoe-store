import { combineReducers } from 'redux';
import clone from 'lodash/clone';
import setWith from 'lodash/setWith';
import { NEW_DATA_RECEIVED, GLOBAL_MESSAGE_CHANGE } from './action';

const storeData = (state = {}, { type, payload }) => {
  let newState = state;
  if (type === NEW_DATA_RECEIVED) {
    const { store, model, inventory } = payload;
    newState = setWith(clone(newState), `${store}.${model}`, inventory, clone);
  }
  return newState;
};

const globalMessage = (state = null, { type, payload }) => {
  let newState = state;
  if (type === GLOBAL_MESSAGE_CHANGE) {
    newState = payload;
  }
  return newState;
};

export default combineReducers({
  storeData,
  globalMessage,
});
