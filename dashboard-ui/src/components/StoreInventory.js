import React from 'react';
import Product from './Product';

function StoreInventory({store, storeItems}) {
  return (
    <div id={store}>
      <header>{store}</header>
      <ul>
        { storeItems.map((item) => {
            return (
              <Product model={item.model} inventory={item.inventory} />
            );
        })}
      </ul>
    </div>
  );
}

export default StoreInventory;
