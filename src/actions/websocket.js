import * as types from '../constants/ActionTypes';

const websocketMiddleware = (url) => {
    return store => {
        let socket = new WebSocket(url);

        socket.onmessage = (message) => {
            store.dispatch({
                type: types.WEBSOCKET_INVENTORY_CHANGE,
                entry: JSON.parse(message.data)
            });
        };

        return next => action => {
            return next(action);
        }
    }
}

export default websocketMiddleware;