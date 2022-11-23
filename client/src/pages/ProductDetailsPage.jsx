import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";

// Icons

// Context
import AuthContext from "../context/AuthContextProvider";

// Components
import CustomButton from "../components/CustomButton";
import RateSeller from "../components/RateSeller";
import Modal from "../components/Modal";
import ComplaintSeller from "../components/ComplaintSeller";
import { AiFillStar } from "react-icons/ai";

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

  const [openRatingModal, setOpenRatingModal] = useState(false);
  const [openComplaintgModal, setOpenComplaintgModal] = useState(false);

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

    const sellerRateData = await fetchSellerRate(data.id);
    const dataWithRate = {
        ...data,
        ...sellerRateData
    } 

    setSeller(dataWithRate);
  };

  //Rating info:
  const fetchSellerRate = async (sellerID) => {

    if (!sellerID) return {};

    const response = await fetch(
        `http://localhost:3000/api/users/${sellerID}/rating/seller`
    );

    const data = await response.json();

    return data;
  };

  const afterRateSellerHandler = async () => {

    const sellerRateData = await fetchSellerRate(seller.id);

    const dataWithRate = {
        ...seller,
        ...sellerRateData
    } 

    setSeller(dataWithRate);
  }

  useEffect(() => {
    fetchProduct();
    fetchPhotos();
    fetchSeller();
    auth && verifyWishlist(parseInt(id));
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
        auth && verifyWishlist(productId);
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
        auth && verifyWishlist(productId);
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

  const getSellerRateSection = () => {

    const reviewAmount = Number(seller?.reviews_amount);

    if (!seller?.rate_average || reviewAmount < 1) return null;

    return (
        <div className="flex items-center flex-wrap gap-1">
            <p className="flex flex-nowrap items-center gap-1 text-xs text-slate-600">
                {Number.parseFloat(seller.rate_average).toFixed(1)}/5
                <AiFillStar
                    style={{ color: "orange", transform: "scale(1.1)" }}
                />
            </p>
            <p className="text-xs text-slate-600">
                ({reviewAmount} reviews)
            </p>
        </div>
    );
  };

  return (
    <div className="container mx-auto mt-16 py-16 min-h-screen">
      {loading ? (
        <div className="flex align-center justify-center">
          <PuffLoader color={"#3B82F6"} />
        </div>
      ) : (
        <div className="grid grid-cols-[624px_1fr] items-start gap-16">
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

          <div className="grid grid-cols-[384px_1fr] bg-white p-12 rounded-xl shadow sticky top-20">
            <div className="flex flex-col gap-12 pr-6">
              <div className="flex flex-col gap-4">
                <h1 className="text-3xl">{product.product_name}</h1>

                <span className="text-2xl font-bold">
                  L. {new Intl.NumberFormat().format(product.price)}
                </span>
              </div>

              <div className="flex flex-col gap-4">
                <span className="font-medium">Descripción del producto:</span>
                <p className="text-gray-500">{product.product_description}</p>
              </div>

              <div className="flex flex-col gap-4">
                <span className="font-medium">
                  Información adicional del producto:
                </span>

                <div className="flex gap-2 items-center">
                  <span className="text-sm text-gray-500">Categoría:</span>
                  <span className="text-sm text-gray-500">
                    {product.category_name}
                  </span>
                </div>

                <div className="flex gap-2 items-center">
                  <span className="text-sm text-gray-500">
                    Fecha de publicación:
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Intl.DateTimeFormat("es-HN", {
                      dateStyle: "long",
                    }).format(new Date(product.created_at))}
                  </span>
                </div>

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
              </div>

              <div>
                {auth &&
                seller.id !== JSON.parse(localStorage.getItem("user")).id &&
                isProductInWishlist ? (
                  <CustomButton
                    type="button"
                    variant="danger"
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

            <div className="flex flex-col gap-4 border-l-[1px] border-gray-20 pl-6">
              <span className="font-medium">Información del vendedor:</span>
              <div className="flex gap-4 items-center">
                <img
                  alt="Avatar"
                  src={seller.avatar}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <p>
                    {seller.first_name} {seller.last_name}
                  </p>
                  {getSellerRateSection()}
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <span className="text-sm text-gray-500">Departamento:</span>
                <span className="text-sm text-gray-500">
                  {product.department_name}
                </span>
              </div>

              <div className="flex gap-2 items-center">
                <span className="text-sm text-gray-500">Municipio:</span>
                <span className="text-sm text-gray-500">
                  {product.municipality_name}
                </span>
              </div>

              <div className="flex flex-col gap-8 mt-8">
                {auth &&
                seller.id !== JSON.parse(localStorage.getItem("user")).id ? (
                  <CustomButton type="button" variant="primary">
                    Contactar al vendedor
                  </CustomButton>
                ) : null}
                {auth ? (
                  <>
                    <CustomButton type="button" variant="secondary">
                      Ir al perfil del vendedor
                    </CustomButton>

                    <div className="flex flex-col gap-2">
                      <CustomButton
                          type="button"
                          variant="secondary"
                          onClick={() =>
                              setOpenRatingModal(true)
                          }
                      >
                          Calificar al vendedor
                      </CustomButton>

                      <CustomButton
                          type="button"
                          className="bg-red-100 text-red-600 hover:bg-red-200/80"
                          onClick={() =>
                              setOpenComplaintgModal(true)
                          }
                      >
                          Denunciar al vendedor
                      </CustomButton>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal
        open={openRatingModal}
        close={() => setOpenRatingModal(false)}
      >
        <RateSeller
          sellerInfo={seller}
          closeModalHandler={setOpenRatingModal}
          afterRateSellerHandler={afterRateSellerHandler}
        ></RateSeller>
      </Modal>

      <Modal
        open={openComplaintgModal}
        close={() => setOpenComplaintgModal(false)}
      >
        <ComplaintSeller
          sellerInfo={seller}
          closeModalHandler={setOpenComplaintgModal}
        />
      </Modal>
    </div>
  );
};

export default ProductDetailsPage;
