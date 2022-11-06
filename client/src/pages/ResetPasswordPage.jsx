import { Form, Formik } from "formik";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// Assets
import ResetPasswordIllustration from "../assets/reset-password-illustration.png";

// Components
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import Logo from "../components/Logo";

// Utils
import { ResetPasswordFormSchema } from "../utils/FormSchemas";

const ResetPasswordPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const resetPassword = async (body) => {
    const response = await fetch(
      "http://localhost:3000/api/auth/reset-password",
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
      const token = localStorage.getItem("resetToken");
      const password = values.password;

      const body = {
        id,
        token,
        password,
      };

      const data = await resetPassword(body);

      if (data.success) {
        localStorage.removeItem("resetToken");
        alert(data.message);
        navigate("/signin");
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
            src={ResetPasswordIllustration}
            alt="Reset Password"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center bg-white gap-16 p-16">
        <Link to="/">
          <Logo />
        </Link>

        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          validationSchema={ResetPasswordFormSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form className="flex flex-col gap-12 max-w-sm">
              <CustomInput
                label="Nueva contraseña"
                type="password"
                name="password"
                placeholder="Ingresa tu nueva contraseña..."
                required
              />

              <CustomInput
                label="Confirmar nueva contraseña"
                type="password"
                name="confirmPassword"
                placeholder="Ingresa de nuevo tu nueva contraseña..."
                required
              />

              <CustomButton type="submit" variant="primary">
                Cambiar contraseña
              </CustomButton>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
