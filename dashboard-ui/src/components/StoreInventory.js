import React, { useState } from 'react';
import Product from './Product';

function StoreInventory({store, storeItems}) {
  const [stockIssues, setStockIssues] = useState(0);

  const calculateStockIssues = () => {
    let issues = storeItems.reduce((acc, product) => {
      if(product.inventory <= 10) {
        return acc = acc + 1;
      }
      return acc
    }, 0);

    setStockIssues(issues);
  }

  return (
    <div id={store}>
      <header>{store} - Stock Issues: {stockIssues}</header>
      <ul>
        { storeItems.map((product) => {
            return (
              <Product
                model={product.model}
                inventory={product.inventory}
                calculateStockIssues = {calculateStockIssues} />
            );
        })}
      </ul>
    </div>
  );
}

export default StoreInventory;
