import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";

// Components
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import CustomSelect from "../components/CustomSelect";
import Modal from "../components/Modal";

// Icons
import { IconContext } from "react-icons";
import { BsFillTrashFill, BsPlusLg } from "react-icons/bs";

// Utils
import { UserFormSchema } from "../utils/FormSchemas";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [userAddress, setUserAddress] = useState([]);
  const [userProducts, setUserProducts] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);

  const userId = JSON.parse(localStorage.getItem("user")).id;

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

  const updateUser = async (body) => {
    const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return data;
  };

  useEffect(() => {
    fetchUserAddress();
    fetchUserProducts();
    fetchDepartments();
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

  const onUpdate = async (values) => {
    try {
      const firstName = values.firstName;
      const lastName = values.lastName;
      const phone = values.phone;
      const email = values.email;
      const password = values.password;
      const departmentId = values.department;
      const municipalityId = values.municipality;
      const avatar = values.avatar.name;

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
        setOpenModal(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const onCreate = async (values) => {
    try {
      const categoryId = activeCategory.id;
      const categoryName = values.categoryName;
      const isActive = values.isActive;

      const body = {
        categoryId,
        categoryName,
        isActive,
      };

      const data = await updateCategory(body);

      if (data.success) {
        fetchCategories();
        setOpenModal(false);
        setActiveCategory([]);
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
                <div className="flex flex-col gap-8">
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
                        onChange={(e) => {
                          props.setFieldValue(
                            "avatar",
                            e.currentTarget.files[0]
                          );
                        }}
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
                  <button className="text-sm font-medium btn-success px-4 py-2 rounded transition flex items-center gap-2">
                    <IconContext.Provider
                      value={{
                        className: "text-green-600",
                        size: "16px",
                      }}
                    >
                      <BsPlusLg />
                    </IconContext.Provider>
                    Agregar nuevo producto
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
