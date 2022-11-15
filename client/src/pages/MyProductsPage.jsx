import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Context
import AuthContext from "../context/AuthContextProvider";

// Components
import CustomButton from "../components/CustomButton";

const MyProductsPage = () => {
  const { auth } = useContext(AuthContext);

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

  useEffect(() => {
    if (auth) {
      fetchUserProducts();
    }
  }, []);

  return (
    <div className="container mx-auto mt-16 py-16 min-h-screen">
      <div className="p-12 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold">Mis productos</h2>
        <div className="flex flex-col gap-12 mt-12">
          {userProducts.map((product, index) => (
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProductsPage;
