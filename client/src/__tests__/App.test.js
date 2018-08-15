import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import defer from 'lodash/defer';
import App from '../app';
import reducer from '../reducer';
import { globalMessageAction, newDataReceivedAction } from '../action'
import { NOTICE_MESSAGE , WARNING_MESSAGE, ERROR_MESSAGE} from '../constant'

const store = createStore(reducer);

describe('App.js', () => {
  it('without props rendering', () => {
    const wrapper = mount((
      <Provider store={store}>
        <App />
      </Provider>
    ));
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('dispatch global msg', async () => {
    const wrapper = mount((
      <Provider store={store}>
        <App />
      </Provider>
    ));
    
    store.dispatch(globalMessageAction({
      messageType: NOTICE_MESSAGE,
      message: 'New Notice message',
    }));
    await new Promise(resolve => defer(resolve));
    expect(toJson(wrapper)).toMatchSnapshot();

    store.dispatch(globalMessageAction({
      messageType: WARNING_MESSAGE,
      message: 'New Warning message',
    }));
    await new Promise(resolve => defer(resolve));
    expect(toJson(wrapper)).toMatchSnapshot();

    store.dispatch(globalMessageAction({
      messageType: ERROR_MESSAGE,
      message: 'New Error message',
    }));
    await new Promise(resolve => defer(resolve));
    expect(toJson(wrapper)).toMatchSnapshot();

    wrapper.find('Snackbar').prop('onClose')();
    await new Promise(resolve => defer(resolve));
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('dispatch new shoe', async () => {
    const wrapper = mount((
      <Provider store={store}>
        <App />
      </Provider>
    ));
    store.dispatch(newDataReceivedAction({
      store: 'My Store',
      model: 'My Model',
      inventory: 21,
    }));
    await new Promise(resolve => defer(resolve));
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
