import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Context
import AuthContext from "../context/AuthContextProvider";

// Components
import CustomButton from "../components/CustomButton";

const WishlistPage = () => {
  const { auth } = useContext(AuthContext);

  const [wishlistProducts, setWishlistProducts] = useState([]);

  const fetchWishlistProducts = async () => {
    const userId = JSON.parse(localStorage.getItem("user")).id;

    const response = await fetch(
      `http://localhost:3000/api/users/${userId}/wishlist/products`
    );
    const data = await response.json();

    if (data.success) {
      setWishlistProducts(data.wishlistProducts);
    } else {
      alert(data.message);
    }
  };

  useEffect(() => {
    if (auth) {
      fetchWishlistProducts();
    }
  }, []);

  const removeFromWishlist = async (productId) => {
    try {
      const userId = JSON.parse(localStorage.getItem("user")).id;

      const body = {
        productId,
        userId,
      };

      const response = await fetch(
        `http://localhost:3000/api/users/${userId}/wishlist`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();

      if (data.success) {
        fetchWishlistProducts();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container mx-auto mt-16 py-16 min-h-screen">
      <div className="p-12 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold">Lista de deseos</h2>
        <div className="flex flex-col gap-12 mt-12">
          {wishlistProducts.map((product, index) => (
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
                variant="muted"
                onClick={() => removeFromWishlist(product.id)}
              >
                Eliminar de lista de deseos
              </CustomButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
