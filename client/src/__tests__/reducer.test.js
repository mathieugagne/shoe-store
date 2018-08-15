import { createStore } from 'redux';
import defer from 'lodash/defer';
import reducers from '../reducer';
import { newDataReceivedAction, globalMessageAction } from '../action'
import { ERROR_MESSAGE, WARNING_MESSAGE, NOTICE_MESSAGE } from '../constant'

const store = createStore(reducers);

describe('reducer.js', () => {
  it('test storeData reducer', async () => {
    const inventoryDetails = {
      store: 'My store',
      model: 'My shoe',
      inventory: 10,
    };
    store.dispatch(newDataReceivedAction(inventoryDetails));
    await new Promise(resolve => defer(resolve));
    expect(store.getState().storeData).toEqual({
      [inventoryDetails.store]: {
        [inventoryDetails.model]: inventoryDetails.inventory,
      },
    });
  });
  describe('test globalMessage reducer', () => {
    it('error', async () => {
      const globalMsg = {
        messageType: ERROR_MESSAGE,
        message: 'Error message',
      };
      store.dispatch(globalMessageAction(globalMsg));
      await new Promise(resolve => defer(resolve));
      expect(store.getState().globalMessage).toEqual(globalMsg);
    });
    it('warning', async () => {
      const globalMsg = {
        messageType: WARNING_MESSAGE,
        message: 'Warning message',
      };
      store.dispatch(globalMessageAction(globalMsg));
      await new Promise(resolve => defer(resolve));
      expect(store.getState().globalMessage).toEqual(globalMsg);
    });
    it('notice', async () => {
      const globalMsg = {
        messageType: NOTICE_MESSAGE,
        message: 'Notice message',
      };
      store.dispatch(globalMessageAction(globalMsg));
      await new Promise(resolve => defer(resolve));
      expect(store.getState().globalMessage).toEqual(globalMsg);
    });
  });
});