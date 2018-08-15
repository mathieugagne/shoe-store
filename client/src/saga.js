import { take, put, call } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import RobustWebSocket from 'robust-websocket';
import { newDataReceivedAction , globalMessageAction } from './action';
import { NOTICE_MESSAGE, WARNING_MESSAGE, ERROR_MESSAGE} from './constant';

const ws = new RobustWebSocket("ws://localhost:8080/", undefined, {
  shouldReconnect: () => 1000,
});

function createChannel() {
  return eventChannel(emit => {
    ws.onopen = () => {
      emit(globalMessageAction({
        messageType: NOTICE_MESSAGE,
        message: 'Connected to server',
      }));
    };
    ws.onmessage = event => {
      const eventData = JSON.parse(event.data);
      emit(newDataReceivedAction(eventData));
      if (eventData.inventory < 10) {
        emit(globalMessageAction({
          messageType: WARNING_MESSAGE,
          message: `${eventData.store} is low on ${eventData.model}`,
        }));
      } else if (eventData.inventory > 90) {
        emit(globalMessageAction({
          messageType: NOTICE_MESSAGE,
          message: `${eventData.store} is high on ${eventData.model}`,
        }));
      }
    };
    ws.onclose = () => {
      emit(globalMessageAction({
        messageType: ERROR_MESSAGE,
        message: 'Disconnected from server',
      }));
    };
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
