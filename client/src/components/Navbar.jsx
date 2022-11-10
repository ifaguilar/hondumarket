import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CustomButton from "./CustomButton";

// Icons
import { IconContext } from "react-icons";
import {
  BsBoxArrowInLeft,
  BsFillGearFill,
  BsFillHeartFill,
  BsFillInboxFill,
  BsFillPersonFill,
} from "react-icons/bs";

// Context
import AuthContext from "../context/AuthContextProvider";

// Components
import Logo from "./Logo";

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const menuRef = useRef();
  const imgRef = useRef();

  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== imgRef.current) {
      setOpen(false);
    }
  });

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
    localStorage.removeItem("subscriptions");
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto py-2 flex justify-between items-center">
        <Link to="/">
          <Logo />
        </Link>

        {auth ? (
          <div className="flex items-center gap-4 relative">
            <IconContext.Provider
              value={{
                className: "text-gray-700 transition",
                size: "16px",
              }}
            >
              <div className="h-10 w-10 flex items-center justify-center cursor-pointer transition rounded hover:bg-gray-100">
                <BsFillHeartFill />
              </div>
            </IconContext.Provider>
            <img
              alt="Avatar"
              src={showAvatar()}
              className="h-10 w-10 rounded-full object-cover cursor-pointer"
              onClick={() => setOpen(!open)}
              ref={imgRef}
            />
            {open ? (
              <div className="bg-white shadow-xl absolute top-12 right-0 rounded-lg">
                <div className="flex items-center px-6 py-4 w-72" ref={menuRef}>
                  <img
                    alt="Avatar"
                    src={showAvatar()}
                    className="h-10 w-10 rounded-full object-cover mr-2"
                  />

                  <div>
                    <p className="text-xs">
                      <strong className="block font-medium">
                        {showFullName()}
                      </strong>

                      <span className="block text-gray-500">{showEmail()}</span>
                    </p>
                  </div>
                </div>
                <ul>
                  <li
                    className="flex gap-4 items-center px-6 py-4 cursor-pointer transition hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    <IconContext.Provider
                      value={{
                        className: "text-gray-700",
                        size: "16px",
                      }}
                    >
                      <BsFillPersonFill />
                    </IconContext.Provider>
                    <span>Perfil</span>
                  </li>
                  <li
                    className="flex gap-4 items-center px-6 py-4 cursor-pointer transition hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    <IconContext.Provider
                      value={{
                        className: "text-gray-700",
                        size: "16px",
                      }}
                    >
                      <BsFillInboxFill />
                    </IconContext.Provider>
                    <span>Mensajes</span>
                  </li>
                  <li
                    className="flex gap-4 items-center px-6 py-4 cursor-pointer transition hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    <IconContext.Provider
                      value={{
                        className: "text-gray-700",
                        size: "16px",
                      }}
                    >
                      <BsFillGearFill />
                    </IconContext.Provider>
                    <span>Configuración</span>
                  </li>
                  <li
                    className="flex gap-4 items-center px-6 py-4 cursor-pointer transition hover:bg-gray-100"
                    onClick={(e) => {
                      setOpen(false);
                      logout(e);
                    }}
                  >
                    <IconContext.Provider
                      value={{
                        className: "text-gray-700",
                        size: "16px",
                      }}
                    >
                      <BsBoxArrowInLeft />
                    </IconContext.Provider>
                    <span>Cerrar sesión</span>
                  </li>
                </ul>
              </div>
            ) : null}
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
