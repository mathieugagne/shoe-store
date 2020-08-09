import React, {useReducer, useEffect} from 'react';

const stores = ['ALDO Centre Eaton', 'ALDO Destiny USA Mall', 'ALDO Pheasant Lane Mall', 'ALDO Holyoke Mall', 'ALDO Maine Mall', 'ALDO Crossgates Mall', 'ALDO Burlington Mall', 'ALDO Solomon Pond Mall', 'ALDO Auburn Mall', 'ALDO Waterloo Premium Outlets']


function inventoryUpdater(state, alert) {
  const inventoryItem = state.filter((invItem) => {
    return (invItem.store === alert.store && invItem.model === alert.model)
  })[0];

  if (inventoryItem) {
    inventoryItem.inventory = alert.inventory;

    return [...state];
  }
  else {
    return [...state, alert];
  }
}

function listenWebSocket(callback) {
  const websocket = new WebSocket('ws://localhost:4000');

  websocket.onopen = () => console.log('Websocket opened');
  websocket.onclose = () => {
    console.log('Websocket closed');
    setTimeout(listenWebSocket, 5000, callback)
  };

  websocket.onmessage = (event) => {
    const inventoryAlert = JSON.parse(event.data);

    callback(inventoryAlert);
  };
}

function App() {
  const [inventory, pushInventory] = useReducer(inventoryUpdater, []);

  useEffect(() => {
    listenWebSocket(pushInventory)
  }, [])

  return (
    <>
    { stores.map((store) => {
      const storeItems = inventory.filter((inventoryItem) => { return (inventoryItem.store === store)});

      return (
        <div id={store}>
          <header>{store}</header>
          <ul>
            { storeItems.map((item) => {
                return (
                  <li id={item.model }>{item.model} - {item.inventory}</li>
                );
            })}
          </ul>
        </div>
        );
    }) }
    </>
  );
}

export default App;
