import { Form, Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Assets
import ForgotPasswordIllustration from "../assets/forgot-password-illustration.png";

// Components
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import Logo from "../components/Logo";

// Utils
import { ForgotPasswordFormSchema } from "../utils/FormSchemas";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const sendEmail = async (body) => {
    const response = await fetch(
      "http://localhost:3000/api/auth/forgot-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    return data;
  };

  const onSubmit = async (values) => {
    try {
      const email = values.email;

      const body = {
        email,
      };

      const data = await sendEmail(body);

      if (data.resetToken) {
        localStorage.setItem("resetToken", data.resetToken);
        alert(data.message);
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="h-screen grid grid-cols-2">
      <div className=" bg-blue-500">
        <div className="flex justify-center items-center h-screen">
          <img
            className="w-3/4"
            src={ForgotPasswordIllustration}
            alt="Forgot Password"
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
          }}
          validationSchema={ForgotPasswordFormSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form className="flex flex-col gap-12 max-w-sm">
              <p className="leading-8 text-center text-sm">
                Si olvidaste tu contraseña, te enviaremos un correo con un
                enlace para que puedas restablecer tu contraseña.
              </p>
              <CustomInput
                label="Correo electrónico"
                type="email"
                name="email"
                placeholder="Ingresa tu correo electrónico..."
                required
              />

              <CustomButton type="submit" variant="primary">
                Enviar correo
              </CustomButton>
            </Form>
          )}
        </Formik>

        <div className="flex flex-col items-center gap-8">
          <p className="text-sm text-gray-500">
            ¿Ya tienes cuenta?
            <Link to="/signin">
              <span className="ml-1 text-blue-500">Inicia sesión</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
