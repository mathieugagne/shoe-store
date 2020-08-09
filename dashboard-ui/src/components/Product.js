import React, { useEffect } from 'react';

function Product({model, inventory, calculateStockIssues}) {
  let hasIssue = inventory <= 10;

  useEffect(() => {
    calculateStockIssues();
  }, [hasIssue]);
  return (
    <li id={model}>{model} - {inventory} - LowStock: {hasIssue.toString()}</li>
  );
}

export default Product;
