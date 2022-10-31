import React from "react";
import { Link } from "react-router-dom";

// Components
import Button from "../components/Button";

// Assets
import ErrorIllustration from "../assets/error-illustration.png";

const ErrorPage = () => (
  <div className="container mx-auto flex justify-center items-center flex-col p-24 gap-12">
    <img
      className="max-w-lg"
      src={ErrorIllustration}
      alt="Página no encontrada"
    />
    <p>
      La página que estás buscando no existe o se ha movido permanentemente.
    </p>
    <Link to="/">
      <Button type="button" variant="primary">
        Ir a la página principal
      </Button>
    </Link>
  </div>
);

export default ErrorPage;
