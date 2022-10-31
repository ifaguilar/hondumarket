import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Components
import Button from "../components/Button";
import Input from "../components/Input";
import Logo from "../components/Logo";

// Context
import AuthContext from "../context/AuthContextProvider";

// Assets
import WebsiteIllustration from "../assets/website-illustration.png";

const SignupPage = () => {
  const { setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    municipalityId: "",
  });

  const { firstName, lastName, phone, email, password, municipalityId } =
    inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = {
        firstName,
        lastName,
        phone,
        email,
        password,
        municipalityId,
      };

      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (
        data &&
        typeof data === "object" &&
        !Array.isArray(data) &&
        !data.message
      ) {
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(data, [
            "id",
            "firstName",
            "lastName",
            "phone",
            "email",
            "avatar",
            "roleId",
          ])
        );

        setAuth(true);
        navigate("/");
      } else {
        console.log("Invalid sign up.");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="h-screen grid grid-cols-2">
      <div className="flex justify-center items-center bg-blue-500">
        <img className="w-3/4" src={WebsiteIllustration} alt="Website" />
      </div>

      <div className="flex flex-col justify-center items-center bg-white gap-16 p-16">
        <Link to="/">
          <Logo />
        </Link>

        <form onSubmit={onSubmitForm} className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <label htmlFor="firstName" className="text-sm font-medium">
              Nombre
            </label>
            <Input
              type="text"
              placeholder="Ingresa tu nombre"
              name="firstName"
              value={firstName}
              onChange={(e) => onChange(e)}
              isRequired={true}
            />
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor="lastName" className="text-sm font-medium">
              Apellido
            </label>
            <Input
              type="text"
              placeholder="Ingresa tu apellido"
              name="lastName"
              value={lastName}
              onChange={(e) => onChange(e)}
              isRequired={true}
            />
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor="phone" className="text-sm font-medium">
              Teléfono
            </label>
            <Input
              type="text"
              placeholder="Ingresa tu teléfono"
              name="phone"
              value={phone}
              onChange={(e) => onChange(e)}
              isRequired={true}
            />
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor="email" className="text-sm font-medium">
              Correo electrónico
            </label>
            <Input
              type="email"
              placeholder="Ingresa tu correo electrónico"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              isRequired={true}
            />
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor="password" className="text-sm font-medium">
              Contraseña
            </label>
            <Input
              type="password"
              placeholder="Ingresa tu contraseña"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              isRequired={true}
            />
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor="municipalityId" className="text-sm font-medium">
              Municipio
            </label>
            <Input
              type="text"
              placeholder="Ingresa tu municipio"
              name="municipalityId"
              value={municipalityId}
              onChange={(e) => onChange(e)}
              isRequired={true}
            />
          </div>

          <div className="flex items-start gap-4">
            <input type="checkbox" name="terms" required />
            <label htmlFor="terms" className="text-sm max-w-xs">
              Crear una cuenta significa que estás de acuerdo con nuestros
              <Link to="/terms">
                <span className="ml-1 text-blue-500">
                  términos y condiciones
                </span>
              </Link>
              .
            </label>
          </div>

          <Button type="submit" variant="primary">
            Registrarse
          </Button>
        </form>

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
  );
};
export default SignupPage;
