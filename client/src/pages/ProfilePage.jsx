import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";
import { ToastContainer, toast } from "react-toastify";

// Components
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import CustomSelect from "../components/CustomSelect";
import Modal from "../components/Modal";

// Icons
import { IconContext } from "react-icons";
import { BsFillTrashFill, BsPlusLg } from "react-icons/bs";

// Utils
import { UserFormSchema, CreateProductFormSchema } from "../utils/FormSchemas";
import CustomTextArea from "../components/CustomTextArea";

// CSS
import "react-toastify/dist/ReactToastify.css";
import SellerRating from "../components/SellerRating";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [userAddress, setUserAddress] = useState([]);
  const [userProducts, setUserProducts] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
  const [rating, setRating] = useState({});

  const userId = JSON.parse(localStorage.getItem("user")).id;

  const navigate = useNavigate();

  const fetchUserAddress = async () => {
    const response = await fetch(
      `http://localhost:3000/api/users/${userId}/address`
    );
    const data = await response.json();

    if (data.success) {
      setUserAddress(data.userAddress);
    } else {
      alert(data.message);
    }
  };

  const fetchUserProducts = async () => {
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

  const fetchDepartments = async () => {
    const response = await fetch("http://localhost:3000/api/departments");
    const data = await response.json();

    setDepartments(data);
  };

  const fetchMunicipalities = async (id) => {
    if (id !== "") {
      const response = await fetch(
        `http://localhost:3000/api/departments/municipalities/${id}`
      );

      const data = await response.json();

      setMunicipalities(data);
    } else {
      setMunicipalities([]);
    }
  };

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:3000/api/categories");
    const data = await response.json();

    setCategories(data);
  };

  const fetchConditions = async () => {
    const response = await fetch("http://localhost:3000/api/conditions");
    const data = await response.json();

    setConditions(data);
  };

  const fetchUserRate = async () => {
    const response = await fetch(
      `http://localhost:3000/api/users/${userId}/rating`
    );

    const data = await response.json();

    setRating(data);
  };

  useEffect(() => {
    fetchUserAddress();
    fetchUserProducts();
    fetchDepartments();
    fetchCategories();
    fetchConditions();
    fetchUserRate();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  });

  const createProduct = async (body) => {
    const response = await fetch(`http://localhost:3000/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return data;
  };

  const deactivateProduct = async (productId, body) => {
    const response = await fetch(
      `http://localhost:3000/api/products/deactivate/${productId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    return data;
  };

  const updateUser = async (body) => {
    const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return data;
  };

  const removeUserProduct = async (productId) => {
    try {
      const body = {
        productId,
      };

      const data = await deactivateProduct(productId, body);

      if (data.success) {
        fetchUserProducts();
        toast.success("Producto eliminado correctamente.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(`${data.message}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const onUpdate = async (values) => {
    try {
      const firstName = values.firstName;
      const lastName = values.lastName;
      const phone = values.phone;
      const email = values.email;
      const password = values.password;
      const departmentId = values.department;
      const municipalityId = values.municipality;
      const avatar = image;

      if (departmentId !== "" && municipalityId === "") {
        alert("Por favor, selecciona un municipio.");
        return;
      }

      const body = {
        firstName,
        lastName,
        phone,
        email,
        password,
        municipalityId,
        avatar,
      };

      const data = await updateUser(body);

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.updatedUser));
        setUser(JSON.parse(localStorage.getItem("user")));
        fetchUserAddress();
        setImage("");
        setOpenModal(false);
        setIsUpdating(false);

        toast.success("Perfil actualizado correctamente.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(`${data.message}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const onCreate = async (values) => {
    try {
      const productName = values.productName;
      const description = values.description;
      const price = parseFloat(values.price);
      const category = parseInt(values.category);
      const condition = parseInt(values.condition);
      const photos = images;

      if (photos.length < 6) {
        toast.warning(
          "Por favor, selecciona al menos 6 imágenes para el producto.",
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        return;
      } else if (photos.length > 12) {
        toast.warning("Solo puedes subir 12 imágenes por producto.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      const body = {
        userId,
        productName,
        description,
        price,
        category,
        condition,
        photos,
      };

      const data = await createProduct(body);

      if (data.success) {
        fetchUserProducts();
        setImages("");
        setOpenModal(false);
        setIsCreating(false);

        toast.success("Producto publicado correctamente.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setTimeout(() => navigate(`/product/${data.newProductId}`), 5000);
      } else {
        toast.error(`${data.message}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleImage = (e) => {
    const image = e.currentTarget.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleImages = async (e) => {
    const files = Array.from(e.currentTarget.files);

    const imageList = await Promise.all(
      files.map(async (image) => {
        const result = await getBase64(image);
        return result;
      })
    );

    setImages(imageList);
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  return (
    <>
      <ToastContainer />
      <Modal
        open={openModal}
        close={() => {
          setOpenModal(false);
          setIsUpdating(false);
          setIsCreating(false);
        }}
      >
        {isUpdating && (
          <Formik
            initialValues={{
              firstName: `${user.firstName}`,
              lastName: `${user.lastName}`,
              phone: `${user.phone}`,
              email: `${user.email}`,
              password: "",
              confirmPassword: "",
              department: "",
              municipality: "",
              avatar: "",
            }}
            validationSchema={UserFormSchema}
            onSubmit={onUpdate}
          >
            {(props) => (
              <Form className="flex flex-col gap-12">
                <div className="flex flex-col gap-12">
                  <h3 className="text-xl font-bold">Actualizar perfil</h3>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-16">
                    <CustomInput
                      label="Nombre"
                      type="text"
                      name="firstName"
                      placeholder="Ingresa tu nombre..."
                    />

                    <CustomInput
                      label="Apellido"
                      type="text"
                      name="lastName"
                      placeholder="Ingresa tu apellido..."
                    />

                    <CustomInput
                      label="Teléfono"
                      type="text"
                      name="phone"
                      placeholder="Ingresa tu teléfono..."
                    />

                    <CustomInput
                      label="Correo electrónico"
                      type="email"
                      name="email"
                      placeholder="Ingresa tu correo electrónico..."
                    />

                    <CustomInput
                      label="Contraseña"
                      type="password"
                      name="password"
                      placeholder="Ingresa tu contraseña..."
                    />

                    <CustomInput
                      label="Confirmar contraseña"
                      type="password"
                      name="confirmPassword"
                      placeholder="Ingresa de nuevo tu contraseña..."
                    />

                    <CustomSelect
                      label="Departamento"
                      name="department"
                      onChange={(e) => {
                        props.handleChange(e);
                        fetchMunicipalities(e.target.value);
                      }}
                    >
                      <option value="">Selecciona tu departamento...</option>
                      {departments &&
                        departments.map((department) => (
                          <option key={department.id} value={department.id}>
                            {department.department_name}
                          </option>
                        ))}
                    </CustomSelect>

                    <CustomSelect label="Municipio" name="municipality">
                      <option value="">Selecciona tu municipio...</option>
                      {municipalities &&
                        municipalities.map((municipality) => (
                          <option key={municipality.id} value={municipality.id}>
                            {municipality.municipality_name}
                          </option>
                        ))}
                    </CustomSelect>

                    <div className="flex flex-col gap-4">
                      <label htmlFor="avatar">Foto de perfil</label>
                      <input
                        type="file"
                        name="avatar"
                        accept="image/png, image/jpeg"
                        onChange={(e) => handleImage(e)}
                      />
                    </div>
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
        {isCreating && (
          <Formik
            initialValues={{
              productName: "",
              description: "",
              price: "",
              category: "",
              condition: "",
              photos: "",
            }}
            validationSchema={CreateProductFormSchema}
            onSubmit={onCreate}
          >
            {(props) => (
              <Form className="flex flex-col gap-12">
                <div className="flex flex-col gap-12">
                  <h3 className="text-xl font-bold">Publicar nuevo producto</h3>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-16">
                    <div className="flex flex-col gap-16">
                      <CustomInput
                        label="Nombre"
                        type="text"
                        name="productName"
                        placeholder="Ingresa el nombre..."
                        required
                      />

                      <CustomInput
                        label="Precio"
                        type="text"
                        name="price"
                        placeholder="Ingresa el precio..."
                        required
                      />

                      <CustomSelect label="Categoría" name="category" required>
                        <option value="">Selecciona una categoría...</option>
                        {categories &&
                          categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.category_name}
                            </option>
                          ))}
                      </CustomSelect>
                    </div>

                    <div className="flex flex-col gap-4">
                      <CustomTextArea
                        label="Descripción"
                        name="description"
                        placeholder="Ingresa una breve descripción sobre este producto..."
                        required
                      />
                    </div>

                    <CustomSelect label="Estado" name="condition" required>
                      <option value="">Selecciona un estado...</option>
                      {conditions &&
                        conditions.map((condition) => (
                          <option key={condition.id} value={condition.id}>
                            {condition.condition_name}
                          </option>
                        ))}
                    </CustomSelect>

                    <div className="flex flex-col gap-4">
                      <label htmlFor="photos">Imágenes</label>
                      <input
                        type="file"
                        name="photos"
                        accept="image/png, image/jpeg"
                        onChange={(e) => handleImages(e)}
                        multiple
                        required
                      />
                    </div>
                  </div>

                  <div className="max-w-sm">
                    <CustomButton type="submit" variant="primary">
                      Publicar producto
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
          <div className="grid grid-cols-[432px_1fr] items-start gap-16">
            <div className="flex flex-col items-center gap-8 bg-white p-12 rounded-xl shadow sticky top-20">
              <img
                className="w-48 h-48 rounded-full object-cover"
                src={user.avatar}
                alt={`${user.firstName} ${user.lastName}`}
                loading="lazy"
              />

              <h2 className="whitespace-nowrap text-3xl font-bold">{`${user.firstName} ${user.lastName}`}</h2>

              {rating?.reviews_amount > 0 && (
                <SellerRating
                  rateAvg={rating.rate_average}
                  reviewAmount={rating.reviews_amount}
                  scale={1.3}
                />
              )}

              <div className="w-full flex flex-col gap-4 mt-16">
                <p className="font-medium">Información de contacto</p>
                <div className="flex flex-col">
                  <span className="text-gray-500">Correo electrónico:</span>
                  <span>{user.email}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500">Teléfono:</span>
                  <span>{user.phone}</span>
                </div>
                <div className="flex flex-col mb-16">
                  <span className="text-gray-500">Dirección:</span>
                  {userAddress && (
                    <span>{`${userAddress.municipality_name}, ${userAddress.department_name}`}</span>
                  )}
                </div>
                <CustomButton
                  type="button"
                  variant="primary"
                  onClick={() => {
                    setIsUpdating(true);
                    setOpenModal(true);
                  }}
                >
                  Editar perfil
                </CustomButton>
              </div>
            </div>

            <div className="bg-white p-12 rounded-xl shadow">
              <div className="flex justify-between">
                <h2 className="text-3xl font-bold">Productos publicados</h2>
                <div>
                  <button
                    className="text-sm font-medium btn-success px-4 py-2 rounded transition flex items-center gap-2"
                    onClick={() => {
                      setIsCreating(true);
                      setOpenModal(true);
                    }}
                  >
                    <IconContext.Provider
                      value={{
                        className: "text-green-600",
                        size: "16px",
                      }}
                    >
                      <BsPlusLg />
                    </IconContext.Provider>
                    Publicar nuevo producto
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-12 mt-16">
                {userProducts.length !== 0 ? (
                  userProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="grid grid-cols-[24px_64px_1fr_1fr_1fr_64px] gap-8 items-center"
                    >
                      <p>{index + 1}</p>
                      <img
                        className="w-16 h-16 object-contain"
                        src={product.photo}
                        alt={product.product_name}
                        loading="lazy"
                      />
                      <p className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {product.product_name}
                      </p>
                      <p className="ml-12">
                        L. {new Intl.NumberFormat().format(product.price)}
                      </p>
                      <div>
                        <Link to={`/product/${product.id}`}>
                          <CustomButton type="button" variant="secondary">
                            Ver producto
                          </CustomButton>
                        </Link>
                      </div>
                      <CustomButton
                        type="button"
                        variant="danger"
                        onClick={() => removeUserProduct(product.id)}
                      >
                        <IconContext.Provider
                          value={{
                            className: "text-red-600",
                            size: "16px",
                          }}
                        >
                          <BsFillTrashFill />
                        </IconContext.Provider>
                      </CustomButton>
                    </div>
                  ))
                ) : (
                  <p>No tienes productos en venta.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
