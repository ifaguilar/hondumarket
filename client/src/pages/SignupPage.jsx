import React from "react";
import { Link } from "react-router-dom";
import WebsiteIllustration from "../assets/website-illustration.png";
import Button from "../components/Button";
import Input from "../components/Input";
import Logo from "../components/Logo";

const SignupPage = () => (
  <div className="h-screen grid grid-cols-2">
    <div className="flex justify-center items-center bg-blue-500">
      <img className="w-3/4" src={WebsiteIllustration} alt="Website" />
    </div>

    <div className="flex flex-col justify-center items-center bg-white gap-16">
      <Link to="/">
        <Logo />
      </Link>

      <form action="" className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <label htmlFor="email" className="text-sm font-medium">
            Correo electrónico
          </label>

          <Input
            type="email"
            placeholder="Ingresa tu correo electrónico"
            name="email"
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
            isRequired={true}
          />
        </div>

        <Button type="submit" variant="primary">
          Registrarse
        </Button>
      </form>

      <div>
        <p className="text-sm text-gray-500">
          ¿Ya tienes cuenta?
          <Link to="/login">
            <span className="ml-1 underline transition hover:text-blue-500">
              Inicia sesión
            </span>
          </Link>
        </p>
      </div>
    </div>
  </div>
);

export default SignupPage;
