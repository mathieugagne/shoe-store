import React from 'react';

function Product({model, inventory}) {
  return (
    <li id={model}>{model} - {inventory}</li>
  );
}

export default Product;
