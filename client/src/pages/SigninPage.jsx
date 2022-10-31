import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Components
import Button from "../components/Button";
import Input from "../components/Input";
import Logo from "../components/Logo";

// Context
import AuthContext from "../context/AuthContextProvider";

// Assets
import MarketplaceIllustration from "../assets/marketplace-illustration.png";

const SigninPage = () => {
  const { setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = {
        email,
        password,
      };

      const response = await fetch("http://localhost:3000/api/auth/signin", {
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
        console.log("Invalid sign in.");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="h-screen grid grid-cols-2">
      <div className="flex justify-center items-center bg-blue-500">
        <img
          className="w-3/4"
          src={MarketplaceIllustration}
          alt="Marketplace"
        />
      </div>

      <div className="flex flex-col justify-center items-center bg-white gap-16">
        <Link to="/">
          <Logo />
        </Link>

        <form onSubmit={onSubmitForm} className="flex flex-col gap-12">
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

          <Button type="submit" variant="primary">
            Iniciar sesión
          </Button>
        </form>

        <div>
          <p className="text-sm text-gray-500">
            ¿No tienes cuenta?
            <Link to="/signup">
              <span className="ml-1 text-blue-500">
                Regístrate
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
