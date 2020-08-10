import React, {useReducer, useEffect} from 'react';
import StoreInventory from './components/StoreInventory';
import './App.css'

const stores = ['ALDO Centre Eaton', 'ALDO Destiny USA Mall', 'ALDO Pheasant Lane Mall', 'ALDO Holyoke Mall', 'ALDO Maine Mall', 'ALDO Crossgates Mall', 'ALDO Burlington Mall', 'ALDO Solomon Pond Mall', 'ALDO Auburn Mall', 'ALDO Waterloo Premium Outlets']


function inventoryUpdater(state, alert) {
  const inventoryItem = state.find((invItem) => {
    return (invItem.store === alert.store && invItem.model === alert.model)
  });

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

  websocket.onclose = () => {
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
    <div className="c-dashboard">
    { stores.map((store) => {
      const storeItems = inventory.filter((inventoryItem) => { return (inventoryItem.store === store)});

      return (<StoreInventory store={store} storeItems={storeItems} />);
    }) }
    </div>
  );
}

export default App;
