import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CustomButton from "./CustomButton";

// Icons
import { IconContext } from "react-icons";
import {
  BsBarChartLineFill,
  BsBoxArrowInLeft,
  BsFillChatFill,
  BsFillHeartFill,
  BsFillPersonFill,
} from "react-icons/bs";

// Context
import AuthContext from "../context/AuthContextProvider";

// Components
import Logo from "./Logo";

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const imgRef = useRef();
  const menuRef = useRef();
  const avatarRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();

  window.addEventListener("click", (e) => {
    if (
      e.target !== menuRef.current &&
      e.target !== imgRef.current &&
      e.target !== avatarRef.current &&
      e.target !== nameRef.current &&
      e.target !== emailRef.current
    ) {
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
    localStorage.removeItem("wishlist");
  };

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <nav className="container mx-auto py-2 flex justify-between items-center">
        <Link to="/">
          <Logo />
        </Link>

        {auth ? (
          <div className="flex items-center gap-4 relative">
            <Link to="/wishlist">
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
            </Link>
            <img
              alt="Avatar"
              src={showAvatar()}
              className="h-10 w-10 rounded-full object-cover cursor-pointer"
              onClick={() => setOpen(!open)}
              ref={imgRef}
            />
            {open ? (
              <div className="bg-white shadow-xl absolute top-12 right-0 rounded-lg z-50">
                <div className="flex items-center px-6 py-4 w-72" ref={menuRef}>
                  <img
                    alt="Avatar"
                    src={showAvatar()}
                    className="h-10 w-10 rounded-full object-cover mr-2"
                    ref={avatarRef}
                  />

                  <div>
                    <p className="text-xs">
                      <strong className="block font-medium" ref={nameRef}>
                        {showFullName()}
                      </strong>

                      <span className="block text-gray-500" ref={emailRef}>
                        {showEmail()}
                      </span>
                    </p>
                  </div>
                </div>
                <ul>
                  <Link to="/profile">
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
                  </Link>
                  {auth &&
                  JSON.parse(localStorage.getItem("user")).roleId === 1 ? (
                    <Link to="/admin">
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
                          <BsBarChartLineFill />
                        </IconContext.Provider>
                        <span>Admin Panel</span>
                      </li>
                    </Link>
                  ) : null}
                  <Link to="/chat">
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
                        <BsFillChatFill />
                      </IconContext.Provider>
                      <span>Mensajes</span>
                    </li>
                  </Link>
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
