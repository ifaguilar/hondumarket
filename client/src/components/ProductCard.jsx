import React from "react";

const Product = ({ product }) => {
  return (
    <div className="">
      <h3>{product.product_name}</h3>
      <p>{product.price}</p>
    </div>
  );
};

export default Product;
