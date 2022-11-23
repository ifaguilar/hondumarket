import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";

// Context
import AuthContext from "../context/AuthContextProvider";

// Components
import CustomButton from "../components/CustomButton";

const MyProductsPage = () => {
  const { auth } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [userProducts, setUserProducts] = useState([]);

  const fetchUserProducts = async () => {
    const userId = JSON.parse(localStorage.getItem("user")).id;

    const response = await fetch(
      `http://localhost:3000/api/users/${userId}/products`
    );
    const data = await response.json();

    if (data.success) {
      setUserProducts(data.userProducts);
    } else {
      alert(data.message);
    }
  };

  const deactivateProduct = async (productId, body) => {
    const response = await fetch(
      `http://localhost:3000/api/products/${productId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    return data;
  };

  useEffect(() => {
    fetchUserProducts();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  });

  const removeUserProduct = async (productId) => {
    try {
      const body = {
        productId,
      };

      const data = await deactivateProduct(productId, body);

      if (data.success) {
        fetchUserProducts();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container mx-auto mt-16 py-16 min-h-screen">
      {loading ? (
        <div className="flex align-center justify-center">
          <PuffLoader color={"#3B82F6"} />
        </div>
      ) : (
        <div className="p-12 bg-white rounded-lg shadow">
          <h2 className="text-3xl font-bold">Mis productos</h2>
          <div className="flex flex-col gap-12 mt-12">
            {userProducts.length !== 0 ? (
              userProducts.map((product, index) => (
                <div key={product.id} className="flex gap-4 items-center">
                  <p className="w-6">{index + 1}</p>
                  <img
                    className="w-16 h-16 object-contain"
                    src={product.photo}
                    alt={product.product_name}
                    loading="lazy"
                  />
                  <p className="w-96">{product.product_name}</p>
                  <p className="w-64">
                    L. {new Intl.NumberFormat().format(product.price)}
                  </p>
                  <div className="w-96">
                    <Link to={`/product/${product.id}`}>
                      <CustomButton type="button" variant="primary">
                        Ver producto
                      </CustomButton>
                    </Link>
                  </div>
                  <CustomButton
                    type="button"
                    variant="danger"
                    onClick={() => removeUserProduct(product.id)}
                  >
                    Dar de baja producto
                  </CustomButton>
                </div>
              ))
            ) : (
              <p>No tienes productos en venta.</p>
            )}
            {}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProductsPage;
