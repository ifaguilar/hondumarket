import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CustomButton from "./CustomButton";
import SearchBar from "./SearchBar";

// Icons
import { BsChevronDown } from "react-icons/bs";

// Context
import AuthContext from "../context/AuthContextProvider";

// Components
import Logo from "./Logo";

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const showFullName = () => {
    if (auth) {
      const user = JSON.parse(localStorage.getItem("user"));
      return `${user.firstName} ${user.lastName}`;
    }
  };

  const showEmail = () => {
    if (auth) {
      const user = JSON.parse(localStorage.getItem("user"));
      return user.email;
    }
  };

  const showAvatar = () => {
    if (auth) {
      const user = JSON.parse(localStorage.getItem("user"));
      return user.avatar;
    }
  };

  const logout = () => {
    setAuth(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto py-2 flex justify-between items-center">
        <Link to="/">
          <Logo />
        </Link>

        <SearchBar />

        {auth ? (
          <div className="flex gap-4">
            <div className="flex items-center cursor-pointer transition py-1 px-2 rounded-md hover:bg-gray-100">
              <img
                alt="Avatar"
                src={showAvatar()}
                className="h-10 w-10 rounded-full object-cover"
              />

              <p className="ml-2 text-xs">
                <strong className="block font-medium">{showFullName()}</strong>

                <span className="block text-gray-500">{showEmail()}</span>
              </p>

              <BsChevronDown className="ml-4 h-4 w-4 text-gray-500" />
            </div>
            <CustomButton
              type="button"
              variant="primary"
              onClick={(e) => logout(e)}
            >
              Cerrar sesión
            </CustomButton>
          </div>
        ) : (
          <div className="grid gap-4 grid-flow-col">
            <Link to="/signin">
              <CustomButton type="button" variant="primary">
                Iniciar sesión
              </CustomButton>
            </Link>
            <Link to="/signup">
              <CustomButton type="button" variant="secondary">
                Registrarse
              </CustomButton>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
