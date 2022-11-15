import React from "react";
import { Link } from "react-router-dom";

// Icons
import { IconContext } from "react-icons";
import { BsFillGeoAltFill } from "react-icons/bs";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <div className="relative cursor-pointer pt-8">
          <img
            className="h-48 mx-auto"
            src={product.photo}
            alt={product.product_name}
            loading="lazy"
          />
          <div
            className={`absolute top-2 left-2 px-2 py-1 text-xs font-medium rounded ${
              product.condition_name === "Nuevo"
                ? "bg-green-100 text-green-600"
                : product.condition_name === "Semi-usado"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            <span>{product.condition_name}</span>
          </div>
        </div>
      </Link>
      <div className="flex flex-col gap-6 p-8">
        <h3 className="text-sm font-medium">{product.product_name}</h3>
        <span className="text-2xl font-bold">
          L. {new Intl.NumberFormat().format(product.price)}
        </span>
        <div className="flex items-center gap-2">
          <IconContext.Provider
            value={{
              className: "text-gray-400",
              size: "16px",
            }}
          >
            <div>
              <BsFillGeoAltFill />
            </div>
          </IconContext.Provider>
          <span className="text-sm text-gray-400">
            {product.municipality_name}, {product.department_name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
