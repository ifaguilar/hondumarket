import { Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

// Assets
import WebsiteIllustration from "../assets/website-illustration.png";

// Context
import AuthContext from "../context/AuthContextProvider";

// Components
import CustomButton from "../components/CustomButton";
import CustomCheckbox from "../components/CustomCheckbox";
import CustomInput from "../components/CustomInput";
import CustomSelect from "../components/CustomSelect";
import Logo from "../components/Logo";
import Modal from "../components/Modal";
import Terms from "../components/Terms";

// Utils
import { SignupFormSchema } from "../utils/FormSchemas";

// CSS
import "react-toastify/dist/ReactToastify.css";

const SignupPage = () => {
  const { setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const authUser = async (body) => {
    const response = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return data;
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

  useEffect(() => {
    fetchDepartments();
  }, []);

  const onSubmit = async (values) => {
    try {
      const firstName = values.firstName;
      const lastName = values.lastName;
      const phone = values.phone;
      const email = values.email;
      const password = values.password;
      const municipalityId = values.municipality;

      const body = {
        firstName,
        lastName,
        phone,
        email,
        password,
        municipalityId,
      };

      const data = await authUser(body);

      if (data.success) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user, [
            "id",
            "firstName",
            "lastName",
            "phone",
            "email",
            "avatar",
            "roleId",
          ])
        );
        localStorage.setItem("token", data.token);

        setAuth(true);
        navigate("/");
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

  return (
    <>
      <ToastContainer />
      <Modal open={openModal} close={() => setOpenModal(false)}>
        <Terms />
      </Modal>
      <div className="h-screen grid grid-cols-2">
        <div className="relative bg-blue-500">
          <div className="fixed flex justify-center items-center h-screen w-1/2 z-0">
            <img className="w-3/4" src={WebsiteIllustration} alt="Website" />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center bg-white gap-16 p-16">
          <Link to="/">
            <Logo />
          </Link>

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              phone: "",
              email: "",
              password: "",
              confirmPassword: "",
              department: "",
              municipality: "",
              terms: false,
            }}
            validationSchema={SignupFormSchema}
            onSubmit={onSubmit}
          >
            {(props) => (
              <Form className="flex flex-col gap-12 max-w-sm">
                <CustomInput
                  label="Nombre"
                  type="text"
                  name="firstName"
                  placeholder="Ingresa tu nombre..."
                  required
                />

                <CustomInput
                  label="Apellido"
                  type="text"
                  name="lastName"
                  placeholder="Ingresa tu apellido..."
                  required
                />

                <CustomInput
                  label="Teléfono"
                  type="text"
                  name="phone"
                  placeholder="Ingresa tu teléfono..."
                  required
                />

                <CustomInput
                  label="Correo electrónico"
                  type="email"
                  name="email"
                  placeholder="Ingresa tu correo electrónico..."
                  required
                />

                <CustomInput
                  label="Contraseña"
                  type="password"
                  name="password"
                  placeholder="Ingresa tu contraseña..."
                  required
                />

                <CustomInput
                  label="Confirmar contraseña"
                  type="password"
                  name="confirmPassword"
                  placeholder="Ingresa de nuevo tu contraseña..."
                  required
                />

                <CustomSelect
                  label="Departamento"
                  name="department"
                  onChange={(e) => {
                    props.handleChange(e);
                    fetchMunicipalities(e.target.value);
                  }}
                  required
                >
                  <option value="">Selecciona tu departamento...</option>
                  {departments &&
                    departments.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.department_name}
                      </option>
                    ))}
                </CustomSelect>

                <CustomSelect label="Municipio" name="municipality" required>
                  <option value="">Selecciona tu municipio...</option>
                  {municipalities &&
                    municipalities.map((municipality) => (
                      <option key={municipality.id} value={municipality.id}>
                        {municipality.municipality_name}
                      </option>
                    ))}
                </CustomSelect>

                <div className="flex gap-4 items-start">
                  <CustomCheckbox label="" type="checkbox" name="terms" />
                  <label htmlFor="terms" className="text-sm max-w-xs">
                    Crear una cuenta significa que estás de acuerdo con nuestros
                    <span
                      className="ml-1 text-blue-500 cursor-pointer"
                      onClick={() => setOpenModal(true)}
                    >
                      términos y condiciones.
                    </span>
                  </label>
                </div>

                <CustomButton type="submit" variant="primary">
                  Registrarse
                </CustomButton>
              </Form>
            )}
          </Formik>

          <div>
            <p className="text-sm text-gray-500">
              ¿Ya tienes cuenta?
              <Link to="/signin">
                <span className="ml-1 text-blue-500">Inicia sesión</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
