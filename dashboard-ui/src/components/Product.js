import React, { useEffect } from 'react';

export function hasLowStock(quantity) {
  return quantity <= 10;
}

function Product({model, inventory, calculateStockIssues}) {
  let hasIssue = hasLowStock(inventory);

  useEffect(() => {
    calculateStockIssues();
  }, [hasIssue]);

  return (
    <div id={model} className={ hasIssue ? 'c-product c-product--low-stock' : 'c-product' }>
      <header>{model}</header>
      <span className="c-product-count">{inventory}</span>
    </div>
  );
}

export default Product;
