import React, {useReducer, useEffect} from 'react';

const sampleAlert = JSON.parse(`{
  "store": "ALDO Centre Eaton",
  "model": "ADERI",
  "inventory": 100
}`);
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

function App() {
  const [inventory, pushInventory] = useReducer(inventoryUpdater, [sampleAlert]);

  useEffect(() => {
    pushInventory({store: 'ALDO Centre Eaton', model: 'ADERI', inventory: 50});
    pushInventory({store: 'ALDO Centre Eaton', model: 'MIRIRA', inventory: 50});

    console.log(inventory);
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
