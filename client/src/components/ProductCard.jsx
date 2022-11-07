import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="cursor-pointer pt-8">
        <img
          className="h-48 mx-auto"
          src={product.photo}
          alt={product.product_name}
        />
      </div>
      <div className="flex flex-col gap-4 p-8">
        <h3 className="text-sm font-medium">{product.product_name}</h3>
        <span className="text-xl font-bold">L. {product.price}</span>
      </div>
    </div>
  );
};

export default ProductCard;
