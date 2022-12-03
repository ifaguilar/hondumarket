import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";

// Components
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import CustomSelect from "../../components/CustomSelect";
import Modal from "../../components/Modal";
import Pagination from "../../components/Pagination";

// Utils
import { ProductFormSchema } from "../../utils/FormSchemas";

const ProductsPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [activeProduct, setActiveProduct] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);

  const fetchProducts = async () => {
    const response = await fetch(
      "http://localhost:3000/api/products/dashboard"
    );
    const data = await response.json();

    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  });

  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  let currentProducts = products.slice(firstProductIndex, lastProductIndex);

  const updateProduct = async (body) => {
    const response = await fetch(
      `http://localhost:3000/api/products/${activeProduct.id}/update`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    return data;
  };

  const onSubmit = async (values) => {
    try {
      const productId = activeProduct.id;
      const expirationDate = values.expirationDate;
      const isActive = values.isActive;

      const body = {
        productId,
        expirationDate,
        isActive,
      };

      const data = await updateProduct(body);

      if (data.success) {
        fetchProducts();
        setOpenModal(false);
        setActiveProduct([]);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Modal open={openModal} close={() => setOpenModal(false)}>
        {activeProduct && (
          <Formik
            initialValues={{
              expirationDate: "",
              isActive: "",
            }}
            validationSchema={ProductFormSchema}
            onSubmit={onSubmit}
          >
            {(props) => (
              <Form className="flex flex-col gap-12">
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-bold">Información de producto</h3>

                  <div className="flex gap-2 text-sm">
                    <span className="font-semibold">ID:</span>
                    <span>{activeProduct.id}</span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-semibold">Nombre:</span>
                    <span>{activeProduct.productName}</span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-semibold">Descripción:</span>
                    <span>{activeProduct.productDescription}</span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-semibold">Precio:</span>
                    <span>
                      L.{" "}
                      {new Intl.NumberFormat("ES-HN").format(
                        activeProduct.price
                      )}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-semibold">
                      Fecha y hora de creación:
                    </span>
                    <span>
                      {new Intl.DateTimeFormat("es-HN", {
                        dateStyle: "long",
                        timeStyle: "short",
                        hour12: true,
                      }).format(new Date(activeProduct.createdAt))}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-semibold">
                      Fecha y hora de última modificación:
                    </span>
                    <span>
                      {new Intl.DateTimeFormat("es-HN", {
                        dateStyle: "long",
                        timeStyle: "short",
                        hour12: true,
                      }).format(new Date(activeProduct.modifiedAt))}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-semibold">Estado:</span>
                    <span>{activeProduct.isActive ? "Activa" : "Oculta"}</span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-semibold">
                      Fecha y hora de expiración:
                    </span>
                    <span>
                      {new Intl.DateTimeFormat("es-HN", {
                        dateStyle: "long",
                        timeStyle: "short",
                        hour12: true,
                      }).format(new Date(activeProduct.expirationDate))}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-8">
                  <h3 className="text-xl font-bold">Campos editables</h3>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-16">
                    <CustomInput
                      label="Fecha y hora de expiración del producto"
                      type="datetime-local"
                      name="expirationDate"
                      required
                    />

                    <CustomSelect
                      label="Estado del producto"
                      name="isActive"
                      onChange={(e) => props.handleChange(e)}
                      required
                    >
                      <option value="">Selecciona una opción...</option>
                      <option value={true}>Activa</option>
                      <option value={false}>Oculta</option>
                    </CustomSelect>
                  </div>

                  <div className="max-w-sm">
                    <CustomButton type="submit" variant="primary">
                      Guardar cambios
                    </CustomButton>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </Modal>
      <div className="container mx-auto mt-16 py-16 min-h-screen">
        {loading ? (
          <div className="flex align-center justify-center">
            <PuffLoader color={"#3B82F6"} />
          </div>
        ) : (
          <div className="p-12 bg-white rounded-lg shadow">
            <h2 className="text-3xl font-bold">Productos</h2>
            <div className="flex flex-col gap-12 mt-12">
              {products.length !== 0 ? (
                <div className="flex gap-4 items-center">
                  <p className="font-semibold w-6">#</p>
                  <p className="font-semibold w-96">Nombre del producto</p>
                  <p className="font-semibold w-96">Fecha y hora de creación</p>
                  <p className="font-semibold w-96">
                    Fecha y hora de última modificación
                  </p>
                  <p className="font-semibold"></p>
                </div>
              ) : null}
              {currentProducts.length !== 0 ? (
                currentProducts.map((product) => (
                  <div key={product.id} className="flex gap-4 items-center">
                    <p className="w-6">{product.id}</p>
                    <p className="w-96">{product.product_name}</p>
                    <p className="w-96">
                      {new Intl.DateTimeFormat("es-HN", {
                        dateStyle: "short",
                        timeStyle: "short",
                        hour12: true,
                      }).format(new Date(product.created_at))}
                    </p>
                    <p className="w-96">
                      {new Intl.DateTimeFormat("es-HN", {
                        dateStyle: "short",
                        timeStyle: "short",
                        hour12: true,
                      }).format(new Date(product.modified_at))}
                    </p>
                    <CustomButton
                      type="button"
                      variant="primary"
                      onClick={() => {
                        setActiveProduct(
                          JSON.parse(`{
                            "id": ${product.id}, 
                            "productName": "${product.product_name}",
                            "productDescription": "${product.product_description}",
                            "price": "${product.price}",
                            "createdAt": "${product.created_at}",
                            "modifiedAt": "${product.modified_at}",
                            "isActive": ${product.is_active},
                            "expirationDate": "${product.expiration_date}"
                          }`)
                        );
                        setOpenModal(true);
                      }}
                    >
                      Editar
                    </CustomButton>
                  </div>
                ))
              ) : (
                <p>No hay productos.</p>
              )}
            </div>
            <div className="mt-8">
              <Pagination
                totalProducts={products.length}
                productsPerPage={productsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductsPage;
