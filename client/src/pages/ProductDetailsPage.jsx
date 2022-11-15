import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";

// Icons
import { IconContext } from "react-icons";
import { BsFillGeoAltFill } from "react-icons/bs";

// Context
import AuthContext from "../context/AuthContextProvider";

// Components
import CustomButton from "../components/CustomButton";

const ProductDetailsPage = () => {
  const { auth } = useContext(AuthContext);

  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [seller, setSeller] = useState([]);
  const [mainPhoto, setMainPhoto] = useState("");
  const [activePhoto, setActivePhoto] = useState(0);
  const [isProductInWishlist, setIsProductInWishlist] = useState(false);

  const fetchProduct = async () => {
    const response = await fetch(`http://localhost:3000/api/products/${id}`);
    const data = await response.json();

    setProduct(data);
  };

  const fetchPhotos = async () => {
    const response = await fetch(
      `http://localhost:3000/api/products/${id}/photos`
    );
    const data = await response.json();

    setPhotos(data);
    setMainPhoto(data[0].photo);
    setActivePhoto(data[0].id);
  };

  const fetchSeller = async () => {
    const response = await fetch(
      `http://localhost:3000/api/products/${id}/seller`
    );
    const data = await response.json();

    setSeller(data);
  };

  useEffect(() => {
    fetchProduct();
    fetchPhotos();
    fetchSeller();
    verifyWishlist(parseInt(id));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  });

  const addToWishlist = async () => {
    try {
      const productId = product.id;
      const userId = JSON.parse(localStorage.getItem("user")).id;

      const body = {
        productId,
        userId,
      };

      const response = await fetch(
        `http://localhost:3000/api/users/${userId}/wishlist`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();

      if (data.success) {
        localStorage.setItem("wishlist", JSON.stringify(data.wishlist));
        verifyWishlist(productId);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const removeFromWishlist = async () => {
    try {
      const productId = product.id;
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
        localStorage.setItem("wishlist", JSON.stringify(data.wishlist));
        verifyWishlist(productId);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const verifyWishlist = (productId) => {
    const result = JSON.parse(localStorage.getItem("wishlist")).filter(
      (product) => {
        return product.product_id === productId;
      }
    );

    if (result.length !== 0) {
      setIsProductInWishlist(true);
    } else {
      setIsProductInWishlist(false);
    }
  };

  return (
    <div className="container mx-auto mt-16 py-16 min-h-screen">
      {loading ? (
        <div className="flex align-center justify-center">
          <PuffLoader color={"#3B82F6"} />
        </div>
      ) : (
        <div className="grid grid-cols-2 items-start gap-16">
          <div className="flex flex-col gap-8">
            <img
              className="aspect-square w-full rounded-xl object-contain bg-white"
              src={mainPhoto ? mainPhoto : ""}
              alt={product.product_name}
              loading="lazy"
            />

            <div className="grid grid-cols-6 gap-4 items-center">
              {photos.map((photo) => (
                <img
                  className={`aspect-square w-48 rounded-xl object-cover bg-white cursor-pointer ${
                    activePhoto === photo.id
                      ? "border-solid border-4 border-blue-500"
                      : ""
                  }`}
                  src={photo.photo}
                  alt={product.product_name}
                  loading="lazy"
                  key={photo.id}
                  onClick={() => {
                    setMainPhoto(photo.photo);
                    setActivePhoto(photo.id);
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8 sticky top-20">
            <div className="flex flex-col gap-8 bg-white p-12 rounded-xl shadow">
              <div>
                <div
                  className={`inline-block px-2 py-1 text-xs font-medium rounded ${
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

              <h1 className="text-2xl">{product.product_name}</h1>

              <p className="text-3xl font-bold">
                L. {new Intl.NumberFormat().format(product.price)}
              </p>

              <p>{product.product_description}</p>

              <div>
                {auth &&
                seller.id !== JSON.parse(localStorage.getItem("user")).id &&
                isProductInWishlist ? (
                  <CustomButton
                    type="button"
                    variant="muted"
                    onClick={() => removeFromWishlist()}
                  >
                    Eliminar de lista de deseos
                  </CustomButton>
                ) : auth &&
                  seller.id !== JSON.parse(localStorage.getItem("user")).id ? (
                  <CustomButton
                    type="button"
                    variant="primary"
                    onClick={() => addToWishlist()}
                  >
                    Agregar a lista de deseos
                  </CustomButton>
                ) : null}
              </div>
            </div>

            <div className="grid grid-cols-2 bg-white p-12 rounded-xl shadow">
              <div className="flex flex-col gap-4 items-center justify-center">
                <img
                  alt="Avatar"
                  src={seller.avatar}
                  className="h-24 w-24 rounded-full object-cover mr-2"
                />
                <p className="text-lg font-medium">
                  {seller.first_name} {seller.last_name}
                </p>
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
              <div className="flex flex-col gap-12 items-center justify-center">
                {auth &&
                seller.id !== JSON.parse(localStorage.getItem("user")).id ? (
                  <>
                    <CustomButton type="button" variant="primary">
                      Contactar vendedor
                    </CustomButton>
                    <CustomButton type="button" variant="secondary">
                      Denunciar vendedor
                    </CustomButton>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
