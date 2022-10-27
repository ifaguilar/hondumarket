import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

const Navbar = () => (
  <div className="bg-white shadow-sm">
    <nav className="container mx-auto py-2 flex justify-between items-center">
      <Link to="/">
        <Logo />
      </Link>

      <SearchBar />

      <div className="grid gap-4 grid-flow-col">
        <Link to="/login">
          <Button type="button" variant="primary">
            Iniciar sesión
          </Button>
        </Link>
        <Link to="/signup">
          <Button type="button" variant="secondary">
            Registrarse
          </Button>
        </Link>
      </div>
    </nav>
  </div>
);

export default Navbar;
