import React from "react";
import { Link } from "react-router-dom";

// Icons
import { IconContext } from "react-icons";
import { BsFillCalendarFill, BsFillGeoAltFill } from "react-icons/bs";

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
        </div>
      </Link>
      <div className="flex flex-col gap-4 p-8">
        <span className="text-2xl font-bold">
          L. {new Intl.NumberFormat("ES-HN").format(product.price)}
        </span>
        <h3 className="font-medium">{product.product_name}</h3>
        <div className="flex gap-2 items-center">
          <span className="text-sm text-gray-500">Estado:</span>
          <div
            className={`px-2 py-1 text-xs font-medium rounded ${
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
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex items-center gap-2">
            <IconContext.Provider
              value={{
                className: "text-gray-500",
                size: "16px",
              }}
            >
              <div>
                <BsFillGeoAltFill />
              </div>
            </IconContext.Provider>
            <span className="text-sm text-gray-500">
              {product.municipality_name}, {product.department_name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <IconContext.Provider
              value={{
                className: "text-gray-500",
                size: "16px",
              }}
            >
              <div>
                <BsFillCalendarFill />
              </div>
            </IconContext.Provider>
            <span className="text-sm text-gray-500">
              {new Intl.DateTimeFormat("es-HN", {
                dateStyle: "long",
              }).format(new Date(product.created_at))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
