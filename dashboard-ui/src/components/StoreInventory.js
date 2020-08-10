import React, { useState } from 'react';
import Product, { hasLowStock } from './Product';

function StoreInventory({store, storeItems}) {
  const [stockIssues, setStockIssues] = useState(0);

  const calculateStockIssues = () => {
    let issues = storeItems.reduce((acc, product) => {
      if(hasLowStock(product.inventory)) {
        return acc = acc + 1;
      }
      return acc
    }, 0);

    setStockIssues(issues);
  }

  return (
    <div id={store} className="c-store">
      <header className="c-store-header">{store}</header>
      <span className="c-store-description">Models with low stock: {stockIssues}</span>
      <div className="c-store-cards">
        { storeItems.map((product) => {
            return (
              <Product
                model={product.model}
                inventory={product.inventory}
                calculateStockIssues = {calculateStockIssues} />
            );
        })}
      </div>
    </div>
  );
}

export default StoreInventory;
