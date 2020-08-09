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
    <li id={model}>{model} - {inventory} - LowStock: {hasIssue.toString()}</li>
  );
}

export default Product;
