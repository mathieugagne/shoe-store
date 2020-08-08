import React from 'react';

const sampleAlert = {
  'store': 'ALDO Ste-Catherine',
  'model': 'ADERI',
  'inventory': 100
};

function App() {
  let inventory = [ sampleAlert ];
  const stores = ['ALDO Ste-Catherine'];

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
