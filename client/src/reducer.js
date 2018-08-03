import { combineReducers } from 'redux';
import clone from 'lodash/clone';
import setWith from 'lodash/setWith';
import { NEW_DATA_RECEIVED } from './action';

const storeData = (state = {}, { type, payload }) => {
  let newState = state;
  switch (type) {
    case NEW_DATA_RECEIVED:
      {
        const { store, model, inventory } = payload;
        newState = setWith(clone(newState), `${store}.${model}`, inventory, clone);
      }
      break;
    default:
      break;
  }
  return newState;
};

const globalMessage = (state = null, { type, payload }) => state;

export default combineReducers({
  storeData,
  globalMessage,
});
