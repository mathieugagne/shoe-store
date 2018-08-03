import { take, put, call } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import ReconnectingWS from 'reconnecting-websocket';
import { connectionChangeAction, newDataReceivedAction } from './action';
import { CONNECTION_OPENED, CONNECTION_CLOSED } from './constant';

const ws = new ReconnectingWS("ws://localhost:8080/");
function createChannel() {
  return eventChannel(emit => {
    ws.onopen = () => emit(connectionChangeAction(CONNECTION_OPENED));
    ws.onmessage = event => emit(newDataReceivedAction(JSON.parse(event.data)));
    ws.onclose = () => emit(connectionChangeAction(CONNECTION_CLOSED));
    return () => {};
  });
}

export default function* () {
  const channel = yield call(createChannel);
  while (true) {
    const newAction = yield take(channel);
    yield put(newAction);
  }
};
