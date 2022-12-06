import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

// Assets
import MarketplaceIllustration from "../assets/marketplace-illustration.png";

// Context
import AuthContext from "../context/AuthContextProvider";

// Components
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import Logo from "../components/Logo";

// Utils
import { SigninFormSchema } from "../utils/FormSchemas";

// CSS
import "react-toastify/dist/ReactToastify.css";

const SigninPage = () => {
  const { setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const authUser = async (body) => {
    const response = await fetch("http://localhost:3000/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return data;
  };

  const onSubmit = async (values) => {
    try {
      const email = values.email;
      const password = values.password;

      const body = {
        email,
        password,
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
      <div className="h-screen grid grid-cols-2">
        <div className=" bg-blue-500">
          <div className="flex justify-center items-center h-screen">
            <img
              className="w-3/4"
              src={MarketplaceIllustration}
              alt="Website"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center bg-white gap-16 p-16">
          <Link to="/">
            <Logo />
          </Link>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={SigninFormSchema}
            onSubmit={onSubmit}
          >
            {(props) => (
              <Form className="flex flex-col gap-12 max-w-sm">
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

                <CustomButton type="submit" variant="primary">
                  Iniciar sesión
                </CustomButton>
              </Form>
            )}
          </Formik>

          <div className="flex flex-col items-center gap-8">
            <p className="text-sm text-gray-500">
              ¿No tienes cuenta?
              <Link to="/signup">
                <span className="ml-1 text-blue-500">Regístrate</span>
              </Link>
            </p>
            <Link to="/forgot-password">
              <span className="text-sm text-blue-500">
                Olvidé mi contraseña
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninPage;
